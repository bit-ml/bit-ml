---
slug: private-set-intersection-an-implementation-in-python
authors: Mădălina Bolboceanu, Miruna Roșca, Radu Țițiu
categories: blog
featured_img: "/galleries/private_set2021/monolith.jpg"
date: May-21-2021
---


# Private Set Intersection from Homomorphic Encryption: A Python Implementation

Check out our **Private Set Intersection (PSI)** implementation in Python [here](https://github.com/bit-ml/Private-Set-Intersection)! 


In this blog post, we will first motivate our interest in **PSI**, by providing a list of applications: password checkup, private contact discovery for Whatsapp or Signal, measuring ads efficiency privately or DNA pattern matching. Secondly, we will show how to build a **PSI** protocol using a **HE** encryption scheme. Thirdly, we will describe our Python implementation of a specific **PSI** protocol.


Our implementation is based on the protocol described in this [paper](https://eprint.iacr.org/2017/299.pdf) and its [follow-up](https://eprint.iacr.org/2018/787.pdf). This protocol uses **Homomorphic Encryption (HE)**, a powerful cryptographic primitive which allows performing computations on encrypted data in such a way that only the secret key holder has access to the decryption of the result of these computations. If you are curious about **HE**, check out [our previous blog post](https://bit-ml.github.io/blog/post/homomorphic-encryption-toy-implementation-in-python/)! Our implementation uses the [BFV](https://eprint.iacr.org/2012/144.pdf) Brakerski-Fan-Vercauteren  **HE** scheme from the [TenSEAL](https://github.com/OpenMined/TenSEAL) library. You can also check out a concurrent [SEAL](https://github.com/microsoft/SEAL)-based [C++ implementation](https://github.com/microsoft/APSI) of the same protocol that has been recently published by   Microsoft.

?> **Disclaimer:** Our implementation is not meant for production use. Use it at your own risk. 


## 1. Private Set Intersection (**PSI**)

Private Set Intersection (**PSI**) is an interactive protocol between a client and a server. The client holds a set of items $Y$ and the server holds a set of items $X$. By the end of the protocol, the client learns the intersection of $X$ and $Y$ and nothing else about the server's set, while the server learns nothing about the client's data. 

### Motivation

Imagine that a WhatsApp client would like to check who among his phone contacts also uses WhatsApp. To get this information, he could send his entire contact list to the WhatsApp server and the server could answer him back with the list of his contacts who use the app. In this way, the server learns the client's list of contacts :warning:. The client may not be happy about this because he values his privacy. Ideally, a client would like to **privately** learn who, among his contacts, uses the app, **without revealing his entire list to the WhatsApp server**. Here is the place where Private Set Intersection comes to the rescue.


![](https://i.imgur.com/CRyDlK2.png)

### What is **PSI**?

Suppose Alice has a list of friends **A** and Bob has a list of friends **B**. Alice is interested in finding out their mutual friends and Bob is ok to share this information with her. Of course, Alice would easily find this out if Bob gave her his list. Or, Alice could send her list to Bob and Bob could answer her back with the information that she is interested in. But both Alice and Bob value their privacy and neither of them wants to reveal his/her entire list of friends to the other.

![](https://i.imgur.com/QSq2yxQ.png)


**PSI** is an interactive cryptographic protocol which allows Alice to find out the friends that she has in common with Bob and nothing else about the rest of Bob's friends and prevents Bob from learning any information about Alice's list of friends. As you can see now, a **PSI** protocol is everything we need to solve the Whatsapp problem that we have described in the last section.

### Applications of **PSI**

**PSI** may be used in many practical applications: 

1. :key: **Password Checkup**: A client wants to check if his credentials are leaked somewhere on the internet. **PSI** allows the client to query a database of leaked passwords, without revealing his actual password to the database owner.

2. :microscope: **DNA private matching**: A client gets his DNA sequenced and wants to find out if his sequence is related to some genetic disease. **PSI** allows the client to query a database of disease-linked sequences, without revealing his DNA sequence.

3. :car: **Measuring ads efficiency**: A car company owners want to measure how efficient are the ads for which they have paid. **PSI** allows the company to find out who among its clients have seen a specific ad on social media (on Facebook for instance), while the car company keeps its list of clients private and Facebook also keeps its list of users private.


## 2. **PSI** from **HE**

One of the first **PSI** protocols in the literature was proposed by Meadows in [this paper](https://www.computer.org/csdl/proceedings-article/sp/1986/07160134/12OmNAYoKof]) and uses as building block the Diffie-Hellman exchange protocol. As we said, in this blog post, we focus on a **PSI** protocol that uses **HE**. The **HE** approach works really well in the *asymmetric* case (i.e. the case where the size of the server's set is much larger than the size of the client's set), with especially great results in terms of communication costs. As you can imagine, this is exactly the case we are interested in: the WhatsApp's database is much larger than the database of a particular client.

### Short recap on **HE**

Let's recap a bit what **HE** is, first.  As nicely explained [here](https://bit-ml.github.io/blog/post/homomorphic-encryption-toy-implementation-in-python/) :wink:, this cryptographic primitive allows you to compute on encrypted data.

In our implementation we use the [BFV](https://eprint.iacr.org/2012/144.pdf) **HE** scheme. This scheme encodes plaintexts as **polynomials of degree less than** ```poly_modulus_degree``` (which is a power of 2) with integer coefficients modulo ```plain_modulus```. Because of the *homomorphic properties* of the scheme, for any plaintexts $m_1, m_2, m$ and $p$, we have that:

$$
\begin{aligned}
\mathsf{Enc}(m_1) + \mathsf{Enc}(m_2) &\equiv \mathsf{Enc}(m_1 + m_2)\\
\mathsf{Enc}(m_1) \cdot \mathsf{Enc}(m_2) &\equiv \mathsf{Enc}(m_1 \cdot m_2)\\
p+\mathsf{Enc}(m) &\equiv \mathsf{Enc}(p+ m)\\
p\cdot\mathsf{Enc}(m) &\equiv \mathsf{Enc}(p\cdot m)
\end{aligned},
$$

Since using [BFV](https://eprint.iacr.org/2012/144.pdf) we can perform additions and multiplications homomorphically on ciphertexts, then we can also evaluate polynomials homomorphically. So cool, no? Still, keep in mind that the parameters of the scheme usually allow performing only a limited number of multiplications! We will get back to this observation soon.


### How to get **PSI** from **HE**

In the rest of this section, we will show you the intuition behind building a **PSI** protocol from a **HE** scheme. We will build this intuition step by step, by starting with very particular cases.

Case **a.** Alice has just one friend $y$ and Bob also has just one friend $x$ (it's unlikely, but who knows, maybe they are both extremely selective :face_with_monocle: when it comes to friendships).


:bulb: **Let's see how they may use the magic of HE**: Alice encrypts her $y$ using a **HE** scheme, gets $\mathsf{Enc}(y)$ and sends it to Bob. Now Bob subtracts his $x$ from $\mathsf{Enc}(y)$ and multiplies this result by a random nonzero integer $r$. Due to the :muscle: of **HE**, the result of Bob's computation is actually an encryption of $r\cdot(y-x)$. He sends $\mathsf{Enc}(r\cdot(y-x))$ back to Alice. Alice now decrypts this element using her secret key and she checks whether she gets a $0$ or not. If she gets a $0$, her friend $y$ is the same as Bob's friend $x$. Otherwise, their friends are different.

![](https://i.imgur.com/kH6ixJv.png)

:exclamation: For the ease of understanding, throughout this section, we will assume that both the plaintexts ($x$, $y$, etc.) and the ciphertexts produced by the **HE** scheme are integers.

!> :thinking_face: **Why does it work?**  When she decrypts, Alice recovers the product $r\cdot(y-x)$. If this product is $0$, it means that one of its terms ($r$ or $y-x$) is $0$. Since $r$ is chosen to be nonzero, it automatically means that $y-x=0$ and Alice will know that her friend $y$ is also Bob's friend. 

If the product is not $0$, it means that $x$ and $y$ are for sure different. Moreover, if we assume that the **HE** scheme has "circuit privacy" (in other words, if we assume that Alice may never find out information about the random element $r$ used by Bob), then the value $r\cdot(y-x)$ recovered by Alice will look random to her and she will never learn any information about Bob's $x$.


Case **b**. Alice still has one friend $y$, but Bob has many friends $x_0,...,x_n$.

Let's assume that Bob has 10 friends ($n=9$). He chooses a random nonzero integer $r$ and associates to his list of friends the monic polynomial

$$
P(X) = r\cdot (X-x_0) \cdot \ldots \cdot (X-x_9).
$$


:exclamation: Keep in mind that $P$ vanishes at $x$ if and only if $x$ belongs to the set $\{x_0,\ldots,x_9\}$. 

**:bulb: Here is the place where HE comes into play**: Alice encrypts her element $y$ with a **HE** scheme, gets $\mathsf{Enc}(y)$ and sends it to Bob. Bob now evaluates his secret polynomial $P$ at $\mathsf{Enc}(y)$ and sends the result back to Alice. Because of the homomorphic properties of the encryption scheme, $P(\mathsf{Enc}(y)) \equiv \mathsf{Enc}(P(y))$, which means that Bob actually sends to Alice an encryption of $P(y)$. When Alice decrypts this value, she checks if it is equal to $0$ or not. If it is $0$, it means that her friend $y$ is also a friend of Bob. Otherwise, $y$ is not among Bob's friends. 

![](https://i.imgur.com/X8vMiPk.png)


!> :thinking_face: **Why does it work?**  When she decrypts, Alice recovers the product $r\cdot(y-x_0)\cdot \ldots \cdot(y-x_9)$. As in Case **a**, this product is $0$ if and only if $y$ is one of Bob's friends.

Case **c**. Alice has many friends, Bob has many friends too.

This is the more general case. At this point you may already have an idea  :nerd_face: on how to solve it! Indeed, Alice and Bob could just repeat the protocol from Case **b** for every friend of Alice! So easy, right?

Still, at this moment you already ask yourself:

1. What happens if Alice has a lot of friends?

In this case, the communication size will grow dramatically since you should repeat the protocol from Case **b** for every friend of Alice. In conclusion, this trivial solution may not be efficient in practice.

2. What happens if Bob has a lot of friends? 

In this case, Bob has to evaluate homomorphically a polynomial of a very large degree. But this may be impossible, since a typical homomorphic encryption scheme allows performing homomorphically only a limited number of multiplications. The reason for this is not hard to understand, read about the noise growing in **HE** [here](https://bit-ml.github.io/blog/post/homomorphic-encryption-toy-implementation-in-python/)!


**Towards a more practical PSI protocol**. In the next section, we will show you how to tackle the above two problems. Concretely, we will describe a range of **optimizations** that we can apply in order to make the above solution work in practice. 


## 3. Implementing the **PSI** protocol 

Before giving more details about the actual implementation, we are going to discuss some of the ideas that enable the basic protocol (Case **c**) to become practical. We will also give an intuition on how **HE** and Oblivious Pseudorandom Functions (**OPRFs**) provide privacy for both the client and the server.

### Optimizations for a practical protocol :gear: 

Suppose the server holds a set of items $X$ and the client has a much smaller set $Y$. In the basic protocol (Case **c**), the client has to send an individual encryption for each element in the set $Y=\{y_0,y_1,y_2,\ldots\}$. This means that the communication cost is proportional to $|Y|$ and we write this as $O(|Y|)$. The server has to homomorphically evaluate the polynomial $P$ at each ciphertext. This implies a computational cost proportional to $|Y|\times \mathsf{Homomorphic.Evaluation}(P)$. For simplicity let's assume that the computational cost of evaluating the polynomial $P$ is proportional to its degree, which is just the size of the server set $|X|$. So we can simply say that the computational cost of the server is $O(|X|\cdot |Y|)$.

#### Batching

The *batching* technique in Homomorphic Encryption is usually used to enable *Single Instruction Multiple Data (SIMD)* operations on ciphertexts. Broadly speaking, this allows the client to 'batch' $N$ items from the set $Y$ into a single ciphertext and the server can simultaneously do computations on the encrypted items. For the **PSI** protocol, it means that batching can reduce the client to server communication as well as the computational cost of the server. 
![](https://i.imgur.com/Ece1O9c.png)

In the above diagram you can see how batching works for multiplication. But it works similarly for addition or any homomorphic operation supported by the scheme.

![](https://i.imgur.com/E1VHdc4.png)

Notice that running the basic protocol using a **HE** scheme that supports batching, the client is able to send fewer ciphertexts $|Y|/N$ and the computational cost of the server drops as well, proportionally to $|X|\cdot |Y| /N$ because the server can homomorphically evaluate the polynomial $P$ at all the $N$ inputs simultaneously.

Conveniently, the **HE** scheme [BFV](https://eprint.iacr.org/2012/144.pdf) supports batching and the TenSEAL library makes it very easy to take advantage of it. In fact, when using TenSEAL, you don't need to know how batching actually works under the hood (it uses the [CRT representation](https://en.wikipedia.org/wiki/Chinese_remainder_theorem)), as the implementation does the batching by default (plaintexts are represented as vectors of integers and homomorphic operations act component-wise on the plaintexts).

#### Hashing 

Remember that the **HE** scheme can't support too many multiplications. Concretely, the scheme correctly works only when the homomorphic computation  is expressed as a circuit (additions/multiplications gates) with *'small' multiplication depth*. To be more precise, in our case, the multiplicative depth corresponding to the parameters of the Brakerski-Fan-Vercauteren scheme implemented in TenSEAL is $3$ or $4$. So, for the rest of the blog post, we will assume that the **HE scheme supports only computations of multiplicative depth $\leq 3$**. You have below two examples for which decryption  works correctly.
![](https://i.imgur.com/1eDqyRF.png)

This is a major problem if we want to use the basic protocol because the server is limited to homomorphic evaluations of polynomials of degree at most $8$. So the set of the server can't be larger than $8$. This is not really satisfying as we would like the server to have millions of items :exploding_head:. So how to increase the number of items on the server side? :thinking_face: 


The first thing one can do is to partition the set of the server $X=X_{0} \cup X_{1} \cup \ldots \cup X_{m-1}$ and the set of the client $Y=Y_0\cup Y_1 \cup \ldots \cup Y_{m-1}$ into 'bins', using some agreed upon hash function $h:\mathcal{U} \to \{0,1,2,\ldots,m-1\}$, with both sets $X,Y$ contained in $\mathcal{U}$. Items fall into the same 'bin' if they hash to the same value. 
![](https://i.imgur.com/AJO8FOu.png)

Now we can run the basic protocol (Case **c**) $m$ times on the pairs of sets $(X_i ,Y_i)$ to find the intersection of $X$ and $Y$. Notice that this optimization can dramatically reduce the computational cost of the server from $|X|\cdot |Y|$ down to $\displaystyle \sum_{i=0}^{m-1} |X_i|\cdot |Y_i|$. Moreover, this strategy also allows for a much larger server set ($|X| \gg 8$), because the server runs the basic protocol on the smaller sets $X_i$. So it's enough to have $|X_i|\leq 8$ for all bins to be able to intersect $X\cap Y$ in this way.

For security reasons, the client must pad its bins with some dummy messages to hide the cardinality of each bin, before engaging in the interaction with the server. By doing the padding, all the client's bins have the same number of items, let's call this number $B_Y$ (notice that $|Y| < m\cdot B_Y$). For example, for $X=Y=\{0,1,\ldots,m-1\}$ and a uniformly random 'hash' function $h:\{0,1,2,\ldots,m-1\} \to \{0,1,2,\ldots,m-1\}$, we have $B_Y=O(\log m)$ with high probability (see the [Balls and Bins Problem](https://en.wikipedia.org/wiki/Balls_into_bins_problem)). In this setting, the computational cost of the server is now $O(m\log m)$ and the client to server communication is $O(m\log m)$.

:exclamation: Using batching, both costs go down by a factor of $N$. To keep the exposition simple we ignore that for now. But keep in mind that we can always use it to get better performance. 

To get a feel for why the padding is necessary, suppose that the bin $Y_3$ is empty and the client doesn't pad it. This means that nothing is sent corresponding to this bin and the server will be able to learn that the client doesn't hold any elements that hash to $3$. This is valuable information that the server should not be able to learn from the execution of the protocol:worried:.  

In general, if we do the padding on the client side, the actual computational cost of the server is proportional to $\sum_{i=0}^{m-1} |X_i|\cdot B_Y$ and the communication cost is actually proportional to $\sum_{i=0}^{m-1} B_Y= m\cdot B_Y$. 

To minimize the costs, we would like some kind of hash function (table) with a range $\{0,1,\ldots,m-1\}$ as small as possible but sufficiently large to map the set of the client with few collisions as possible. A good candidate is the so-called [Cuckoo Hash table](https://en.wikipedia.org/wiki/Cuckoo_hashing#cite_note-Cuckoo-1) :bird:, which works for $|Y|\approx \frac{2}{3} \cdot m$ and guarantees that there are no collisions (i.e. $B_Y=1$) when hashing the client set $Y$. For $|X|=m$ and $|Y|=2/3\cdot m$, using Cuckoo hash tables, the computational cost and communication drop to $O(m)$, compared to the similar parameters of the previous example.

In the actual protocol only the client uses Cuckoo hash tables. The server has to compute simple hash values that are compatible with the Cuckoo hash table structure.

#### Windowing 

Let's suppose that the set $X$ of the server is partitioned into many bins $X=X_{0} \cup X_{1} \cup \ldots \cup X_{m-1}$. We denote the maximum bin capacity (load) by $B_X=\displaystyle \max_{0\leq i <m} |X_i|$. We can currently run the protocol only when the parameters are chosen such that the maximum bin capacity is less than $8$. But the bound $8$ can actually be **increased** for the **same multiplicative depth** :boom:! This can be done by increasing the communication cost from the client to the server by the logarithmic factor $\log B_X$. 

:bulb:The idea is the following. The server needs to homomorphically evaluate the polynomials corresponding to each bin $X_i$. This means that the server must be able to do homomorphic evaluations of polynomials of degree $B_X$. Let's denote by $n=\lfloor \log B_X \rfloor$. To intersect with one item $Y = \{y\}$, the client encrypts the powers $\{y,y^2,y^{2^2},y^{2^3},\ldots, y^{2^{n}}\}$ and sends them to the server. 
![](https://i.imgur.com/KiIToNb.png)


Now, for any power $k\leq B_X$ the server uses the binary representation of $k$: $k=k_0+k_1\cdot 2^{1} + k_2\cdot 2^{2} + \cdots + k_n\cdot 2^n$, with $k_i \in \{0,1\}$, to compute the encryption of $y^k$ as $$y^k=y^{k_0} \cdot \left( y^{2^1} \right)^{k_1}\cdot \left( y^{2^2}\right)^{k_2} \cdot \left(y^{2^3} \right)^{k_3}\cdot\ldots \cdot \left(y^{2^n}\right)^{k_n}$$ 
This computation can be done in multiplicative depth equal to $\lceil\log (n+1)\rceil$. By keeping the multiplicative depth the same as before, equal to $3$, we can afford $n\leq 7$, which gives $B_X\leq 255$ . This means we can run the basic protocol on each bin as long as the maximum load $B_X$ satisfies this bound.

:exclamation: Windowing **is compatible** with Batching. Do you see why? Suppose that at some point during the protocol, the client encrypts the batch $\bf{y}$=$(y_0,y_1,\ldots,y_{N-1})$ and sends it to the server. To also make use of the windowing technique, the client first computes all the powers $\{y_i,y_i^2,y_i^4,\ldots, y_i^{2^n}\}$ needed for windowing and applies batching as below. Then the client sends all the ciphertexts to the server, as in the picture below.

![](https://i.imgur.com/DXpM0PU.png)

Notice that the server is able to compute the encryption of $\bf{y}^k$, for any $k \leq B_X$, by using the binary representation of $k$ and the ciphertexts sent by the client. In fact, the server can homomorphically evaluate its polynomial $P$ at $\bf{y}$ and send back the answer to the client. Now the client can decrypt to recover $P(\bf{y})$, then applies $\texttt{Batch\_decode}$ to recover $(P(y_0),P(y_1),\ldots, P(y_{N-1}))$. 

:sunflower: In TenSEAL, $\texttt{Batch\_encode}$ and $\texttt{Batch\_decode}$ are done automatically, so we don't need to worry about them. You can simply think that when you evaluate the polynomial $P$ at a ciphertext that encrypts $(y_0,y_1,\ldots,y_N)$, the evaluation is done component-wise, obtaining $(P(y_0), P(y_1),\ldots, P(y_{N-1}))$.

#### Partitioning

We have seen how to increase the size of the server's set $|X|$ by using Hashing techniques and Windowing. We can increase it even further, but this time we increase it by paying an extra cost :moneybag: for the server to client communication. 

To this end, let $\alpha$ be a positive integer, the partitioning parameter. The idea is to further partition each bin $X_i$ into $\alpha$ mini bins, each of size less than $B_X/\alpha$. We get a total number of $m\cdot \alpha$ mini bins ($\alpha$ mini bins for each of the $m$ bins). Then, for each mini bin, the corresponding polynomial is computed. Therefore to answer the client's query, the server has to homomorphically evaluate $m\cdot \alpha$ polynomials. Notice that the degrees of all these polynomials are less than $B_X/\alpha$. Now the server runs the basic protocol (+ windowing) for these mini bins. Notice that as long as $B_X /\alpha \leq 255$ the protocol works. The effects of this change are: 

:heavy_check_mark: With partitioning the protocol supports even larger server sets. The reason is that the bins $X_i$ can now handle up to $\alpha \cdot 255$ items. Since the bins are much larger, the server set can now be much larger!

:x: The downside of using partitioning is that the server to client communication is increased by a factor of $\alpha$, because for each mini bin the server has to send back a corresponding answer to the client.



### Security :closed_lock_with_key:
The security of the protocol prevents a potentially malicious server (one that is able to deviate from the honest protocol) from learning any information about the set of the client. Vice versa, the server's privacy is also protected against a possibly malicious client. 

Intuitively, the set of the client is encrypted when it is sent to the server, so a potentially malicious server is not able to learn anything from the ciphertexts, regardless of what the server does with these encryptions.

When it comes to the privacy of the server, first recall that the server homomorphically evaluates a polynomial (closely related to its set) at the ciphertexts sent by the client. 
A malicious client who also has access to the randomness used for encryption and to the secret decryption key may use the result of this computation to infer information about the computation done by the server, in particular about the server's set. This is possible because the [BFV](https://eprint.iacr.org/2012/144.pdf) homomorphic encryption scheme does not have *circuit privacy*, which means that the scheme itself does not hide the computation that has been carried out on a ciphertext. The privacy of the server is guaranteed by the use of *Oblivious Pseudorandom Functions (OPRFs)*. 

#### Oblivious PRFs

Let's consider a [Pseudorandom Function (PRF)](https://en.wikipedia.org/wiki/Pseudorandom_function_family) $F$, that takes as input a secret key $k$ and some input and efficiently computes some output. As long as the key remains secret, the values that the **PRF** outputs 'look' completely 'random'. For intuition, you can think of the [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) function.

Assume that only the server knows the secret key $k$. The server precomputes the set $X':=\{ F_k(x) \text{ : for all } x \in X\}$. Now, assume that through some magic :crystal_ball:(i.e. **without having access to any information about the secret key** $k$), the client can compute $F_k(y)$ for all $y \in Y$  and further create the set $Y'=\{F_k(y)\text{ : for all } y \in Y \}$. Now the two can engage in the **PSI** protocol for the sets $X'$ and $Y'$ to find their intersection, from which the client can deduce $X\cap Y$.

:exclamation: One important thing is that in the eyes :eyes: of the client the set $X'$ does not leak any information about the server set $X$, as the secret key is unknown to the client. Therefore the privacy of the server is protected against a potentially malicious client!

![](https://i.imgur.com/P10n43A.png)
                                                                                       
**Oblivious PRF** is an interactive protocol that replaces the above 'magic' :crystal_ball:. Namely, it allows the client to learn the **PRF** values $F_k(y)$ (for some particular **PRF**), without having access to the secret key. In our implementation we use a Diffie-Hellman like **OPRF** protocol that is implemented using elliptic curve point additions.

### The protocol

:mag: Let's take a closer look at the **PSI** protocol. The server holds a list of ```server_size``` items, while the client holds a list of ```client_size``` items. 

Let us give you a bird's eye view on the protocol with all the steps:

![](https://i.imgur.com/OCnd34n.png)



In the offline phase, both the server and the client preprocess their datasets. This offline preprocessing needs to be done only once by each party. The server preprocesses its set of items and then can engage in the online phase of the protocol many times with possible many clients. The vice-versa is also possible.

1.  **Oblivious Pseudorandom Function** (**OPRF**): First, they apply an [OPRF](https://github.com/bit-ml/Private-Set-Intersection/blob/main/oprf.py) layer to their inputs. For this, the two parties engage in a Diffie-Hellman-like interactive protocol on elliptic curves. The client and the server end up having their entries encoded in a *special way*, using the secret key of the server, ```oprf_server_key```.  Basically, using a generator $G$ of an elliptic curve, an entry (which is an integer) ```item``` is first encoded as the point ```item```$\cdot$ $G$ on the elliptic curve. Then, it is further multiplied *interactively* by the secret integer ```oprf_server_key```. Then, they both take ```sigma_max``` bits out of the first coordinate of each such point. 

After this step, both the server and the client have new datasets, ```PRFed_server_set``` and ```PRFed_client_set```, each of ```sigma_max```-bit integers. Check our code for this [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/client_online.py#L51) and [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/server_offline.py#L22).

<details><summary>
If you're curious how the OPRF protocol works, <b>click here</b>.
</summary>

The OPRF protocol is as follows:

* The server gets his ```PRFed_server_set``` by doing for each of his items the following:
```server_item``` $\rightarrow$ ```server_item```$\cdot$ $G$ $\rightarrow$ ```oprf_server_key``` $\cdot$ ```server_item``` $\cdot$  $G$ $\rightarrow$ ```sigma_max``` bits out of the first coordinate.
* The client creates a set to send to the server by doing for each of his items the following:
```client_item``` $\rightarrow$ ```client_item```$\cdot$ $G$ $\rightarrow$ ```oprf_client_key``` $\cdot$ ```client_item``` $\cdot$ $G$. 
* The server obtains the client's points, multiplies them by ```oprf_server_key``` and sends them back to the client. 
```oprf_client_key``` $\cdot$ ```client_item``` $\cdot$ $G$ $\rightarrow$ ```oprf_server_key```$\cdot$ ```oprf_client_key``` $\cdot$ ```client_item``` $\cdot$ $G$.  
* The client gets his ```PRFed_client_set``` by doing:
```oprf_server_key```$\cdot$ ```oprf_client_key``` $\cdot$ ```client_item``` $\cdot$ $G$ $\rightarrow$ ```oprf_client_key```$^{-1}$ $\cdot$```oprf_server_key```$\cdot$ ```oprf_client_key``` $\cdot$ ```client_item``` $\cdot$ $G$ $\rightarrow$ ```oprf_server_key``` $\cdot$ ```client_item``` $\cdot$ $G$ $\rightarrow$ ```sigma_max``` bits out of the first coordinate
</details>
<br />

2. **Hashing**: The server and the client both agree on using a total number of ```number_of_hashes``` hash functions with ```output_bits``` bits of output.

* The client performs [*Cuckoo hashing*](https://github.com/bit-ml/Private-Set-Intersection/blob/main/cuckoo_hash.py). You can check the implementation [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/client_online.py#L56). By the end of this step, each of his bins has at most $1$ element. For security reasons, empty bins are padded with one dummy message. You may think of his database as a column vector with ```number_of_bins``` rows. 
* The server performs [*Simple hashing*](https://github.com/bit-ml/Private-Set-Intersection/blob/main/simple_hash.py); each of his bins has ```bin_capacity``` elements. Think of its database as a matrix with ```number_of_bins``` rows and ```bin_capacity``` columns. Roughly speaking, for each element and each hash function, the server inserts the element in a bin corresponding to its hash value. You can check its implementation [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/server_offline.py#L33).

Recall that after the **OPRF** step, the database entries of both the client and the server have ```sigma_max``` bits. In order to reduce the storage of the items in the hash tables, both the client and the server perform a *permutation-based hashing* step. In this way, they reduce the length of the items to ```sigma_max``` - ```output_bits``` + $\lfloor \mathsf{log}($```number_of_hashes```$)\rfloor+1$ bits, by encoding a part of the item in the index of the bin where the item belongs.


:exclamation:  The bins correspond to all the possible values that the hash functions can take. This means that ```number_of_bins``` = 2 ** ```output_bits```.
<details><summary> <b>Click here</b> to see how the elements are inserted in their hashing tables.</summary>

  We describe here shortly the steps for their insertion:
* We write ```item``` as ```item_left||item_right```, where ```item_right``` has ```output_bits``` bits and ```item_left``` has ```sigma_max``` - ```output_bits``` bits.
* For a specific index $i$ less than ```number_of_hashes```, we compute the so-called *location function* $\mathsf{Loc}$($i,$ ```item```): 
 ```item``` $\rightarrow$ ```item_left||item_right``` $\rightarrow$ $\mathsf{Loc}$($i,$ ```item```) = $H_i$(```item_left```) $\oplus$ ```item_right```.
* We insert ```item``` in a bin corresponding to its location as ```item_left||i```, which has ```sigma_max``` - ```output_bits``` + $\lfloor \mathsf{log}$(```number_of_hashes```)$\rfloor$ + 1 bits.


!> Notice that given ```item_left||i``` and the location, $\mathsf{Loc}$($i,$ ```item```), you can recover the initial ```item,```, by computing ```item_right``` = $\mathsf{Loc}$($i,$ ```item```) $\oplus$ $H_i$(```item_left```).


!> **Why does it work?** Let's say that the server has stored $x$ as $(x_L || i)$ in a bin, whereas the client has stored $y$ as $(y_L || j)$ in the same bin. Then, $(x_L || i) = (y_L || j)$ leads to $x_L = y_L$ and $i = j$ and hence, $x = y$.
</details>

<br />


:exclamation: One solution to avoid hashing failures in *Cuckoo hashing* is to use at least $3$ hash functions for inserting items into the Cuckoo table. While increasing the number of hashses above $3$ may reduce the hashing failures, this will significantly increase the simple hashing cost of the server. Hence, a good choice seems to be ```number_of_hashes``` = $3$.

:exclamation: For ```number_of_hashes``` = $3$, we can insert the client's items into the *Cuckoo hash table* with a failure probability of $2^{-40}$, in a total number of bins equal to ```number_of_bins```= $3/2 \cdot$ ```client_size```  . For more details, check **Hashing failures** [here](https://eprint.iacr.org/2017/299.pdf).

:exclamation: For ```number_of_hashes``` = $3$, we should choose ```bin_capacity``` carefully so that inserting ```number_of_hashes``` $\cdot$ ```server_size``` items via *simple hashing* succeeds with a failure probability of $2^{-30}$. For example, for ```server_size``` = $2^{20},$ we must pick ```bin_capacity``` = $536$. To see how to choose the ```bin_capacity``` parameter as a function of the security parameter, the output size of the hash functions and the server's maximum set size , check [Table 1](https://eprint.iacr.org/2017/299.pdf) or you can also run the [bin_capacity_estimator.py ](https://github.com/bit-ml/Private-Set-Intersection/blob/main/bin_capacity_estimator.py) script to obtain more values.

**Example**: Let's take ```bin_capacity``` = $6$. Throughout this blog post, we will show the bins as rows: the server's bins contain items represented as red balls, whereas the client's bins contain items represented as green balls.:art: 

![](https://i.imgur.com/NamEMEX.png)


?> :bulb: A *padding step* with dummy messages might be required to get *all the bins of the server full.* Server padding is important for *batching*, as you will see soon.

Hence, the server can run the **PSI** protocol **on each bin.** As discussed above, the server can associate to each bin a polynomial and evaluate it at an encrypted query. The degree of the polynomial is in this case ```bin_capacity```, the number of elements in each of the server's bins. But this degree can be pretty big and the encryption scheme that we use may not allow us to correctly compute the polynomial evaluation. So we *partition* the bins into mini bins and associate to each mini bin a polynomial of a lower degree.

3. **Partitioning**: The server partitions each bin into ```alpha``` mini bins, having ```bin_capacity```/```alpha``` elements. 

:exclamation: There will be ```number_of_bins``` $\cdot$ ```alpha``` mini bins. 

Hence, performing the **PSI** protocol for each bin reduces to **performing** ```alpha``` **PSI** protocols for each mini bin. 

**Example**: Let's assume that each bin is partitioned into ```alpha``` = $3$ mini bins. In this case, each mini bin has $2$ elements, as it is shown in the picture.

![](https://i.imgur.com/7EGZcog.png)


4. **Finding the polynomials**: For each mini bin, the server computes the coefficients of the monic polynomial that vanishes at the elements of that mini bin, see [this](https://github.com/bit-ml/Private-Set-Intersection/blob/main/auxiliary_functions.py#L76). This means that each mini bin can now be described by ```bin_capacity```/```alpha``` +1 coefficients. By convention, the coefficients are written in decreasing order, namely the first column in the mini bin corresponds to the leading coefficient of the polynomial, the second column to the next coefficient and so on. You can see how both finding the polynomials and partitioning are implemented on the server side [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/server_offline.py#L51).

?> The coefficients of the polynomials are computed modulo ```plain_modulus```, a parameter involved in the homomorphic encryption scheme. More on this parameter will follow soon.

**Example**: In our case, each mini bin has $2$ elements, which means that it can be represented by  the coefficients of a monic polynomial $P(X) = X^2 + a_1X + a_0$ of degree $2$, i.e. by $[1, a_1, a_0]$.

![](https://i.imgur.com/0etGFYY.png)

At this step, both the server and the client perform the actual **PSI** protocol, as in Case **b**, but with the optimizations described above. 

So far, we said that the **PSI** protocol can be performed per each bin of client, against a corresponding mini bin of server. But we can do better :muscle:.

5. **Batching**: The **HE** scheme that we use benefits from a special property, called *batching*, that helps the client to pack his bins and to perform **many queries simultaneously**. 

!> Recall that the scheme [BFV](https://eprint.iacr.org/2012/144) allows encrypting polynomials of degree less than ```poly_modulus_degree``` modulo ```plain_modulus```. The ```plain_modulus``` is chosen so that it is a prime congruent with 1 modulo 2 $\cdot$ ```poly_modulus_degree```, which helps identifying each such polynomial with a vector of ```poly_modulus_degree``` integer entries modulo ```plain_modulus```. *This is what batching is about.*  [TenSEAL](https://github.com/OpenMined/TenSEAL/blob/master/tutorials%2FTutorial%200%20-%20Getting%20Started.ipynb) allows encryption of **vectors of integers**, by first performing the above correspondence and then performing the actual encryption. Also, in a similar way, decrypting in TenSEAL works for **vectors of integers**.

<details><summary>If you're interested in finding out more about this encoding, <b>click here</b>.</summary>

The plaintext space is the ring of integer polynomials $\frac{\mathbb{Z_t}[X]}{(X^N+1)},$ where $t$ = ```plain_modulus``` and $N$ = ```poly_modulus_degree```. 

:bulb:Since $t \equiv 1$ mod $2\cdot N$, the polynomial $X^N+1$ factorizes as a product of *linear polynomials* modulo $t$, i.e. 

$$
X^N+1 = (X-u_1) \cdot (X-u_2)\cdot \ldots \cdot (X-u_N) \text{ mod } t.
$$

Therefore, there is a ring *isomorphism*, given by the [Chinese Remainder Theorem (CRT)](https://en.wikipedia.org/wiki/Chinese_remainder_theorem): 

$$
\frac{\mathbb{Z}_t[X]}{(X^N+1)} \rightarrow \mathbb{Z}_t^{N},
$$

where a polynomial $p$ is *encoded* as $[p(u_1), p(u_2), \ldots, p(u_N)].$

This map behaves nicely with respect to addition and multiplication: addition of polynomials corresponds to addition of vectors, whereas multiplication of polynomials corresponds to component-wise multiplication of vectors.

**Example**: If $N$ = ```poly_modulus_degree``` = 2 and $t\equiv 1$ mod $4$, then $X^N+1 = (X-u_1) \cdot (X-u_2)$ mod $t$. In this case, a *polynomial* $p$ corresponds to the *vector of integers* $[p(u_1), p(u_2)]$ modulo $t$.
</details>

<br />

- The client batches his bins (having each 1 integer entry)  into ```number_of_bins```/```poly_modulus_degree``` vectors.
- The client encodes each such batch as a plaintext.
- The client encrypts these plaintexts and sends them to the server.
- The server batches his minibins in minibatches.

**Example**: For simplicity of exposition, let's take ```poly_modulus_degree``` = $2$. This means that the client batches together vectors of $2$ elements. The server matches this on his side, by batching together $2$ mini bins into a *mini batch*.

![](https://i.imgur.com/WuPvEAt.png)

!> In our implementation, we choose ```number_of_bins``` = ```poly_modulus_degree```, so all the client's bins are batched into just one plaintext.

:mag: The **PSI** protocol is now performed on a client's batch and on one of the corresponding server's mini batches.

![](https://i.imgur.com/qGFbEuA.png)


:exclamation: In general there are ```alpha``` $\cdot$ ```number_of_bins```/```poly_modulus_degree``` mini batches so the PSI protocol si apllied the same number of times.

!> Batching lowers the *communication and computation costs on the client side.*

:warning: Before going into the next step, *windowing*, let's take a deep breath now and recall a bit what we have so far. You can forget about batching for a minute. Each mini bin has ```bin_capacity```/```alpha``` elements, so it is represented by a monic polynomial of degree```bin_capacity```/```alpha```. Let's call this degree shortly as $D$.

Therefore, each polynomial looks like 
$$
P(X) = X^D + a_{D-1}X^{D-1}+\ldots+a_{1}X+a_0.
$$
for some integer coefficients $a_i$.

As in Case **b**, the client should send an encryption $\mathsf{Enc}(y)$ of one bin containing an integer $y$, and the server should evaluate the polynomial $P(X)$ at this encrypted value.

Performing this evaluation requires, in particular, to compute $\mathsf{Enc}(y)^D \equiv \mathsf{Enc}(y^D)$, which can be done in multiplicative depth $\lceil \mathsf{log}(D)\rceil$. But this multiplicative depth may be too large to be handled by the **HE** scheme. In this case, the client may come to the rescue and send the encryptions of all powers:

$$
\mathsf{Enc}(y), \mathsf{Enc}(y^2), \mathsf{Enc}(y^3),\ldots, \mathsf{Enc}(y^D)
$$

So by using the magic powers of the **HE** scheme :crystal_ball:, the evaluation of the polynomial turns out to be just a *scalar product* of these encryptions with the vector of coefficients of the polynomial:

$$
P(\mathsf{Enc}(y)) = \langle (1, a_{D-1},\ldots,a_0), (\mathsf{Enc}(y^D), \mathsf{Enc}(y^{D-1}),\ldots,\mathsf{Enc}(1)) \rangle.
$$

Still, the client needs to send $D$ encryptions (per bin), which means *a lot of communication on the client side* :scream:. 

**We need to look for a tradeoff** :scales:. Notice that if the client sends the $\lfloor\mathsf{log}(D)\rfloor+1$ encryptions

$$
\mathsf{Enc}(y), \mathsf{Enc}(y^2), \mathsf{Enc}(y^4) \ldots, \mathsf{Enc}(y^{2^{\lfloor\mathsf{log}(D)\rfloor}}),
$$

then each power $\mathsf{Enc}(y)^e \equiv \mathsf{Enc}(y^e)$, for any $e\leq D$, can be computed by writing $e$ in binary decomposition. The server recovers any $\mathsf{Enc}(y^e)$, in the worst case, by multiplying all the $\lfloor\mathsf{log}(D)\rfloor + 1$ (encrypted) powers, which requires a circuit of multiplicative depth $\lceil\mathsf{log}(\lfloor\mathsf{log}(D)\rfloor +1)\rceil$.

So yay! we **lowered** the initial multiplicative depth of the polynomial, from $\lceil\mathsf{log}(D)\rceil$, to $\lceil\mathsf{log}(\lfloor\mathsf{log}(D)\rfloor +1)\rceil$, while incurring a only **a small $\log D$ factor communication cost**. It turns out that we can do this even better: we can lower the depth to $\lceil\mathsf{log}(\lfloor\mathsf{log}(D)\rfloor/\ell+1)\rceil,$ for some so-called *windowing* parameter $\ell$ if we are willing to pay some extra communication cost.


Now it's time to come back to the protocol and tell you how this idea is used, combined with batching:

6. **Windowing**: It lowers the depth of the arithmetic circuit above (i.e. of the polynomial of degree $D$). The client sends *sufficiently many (encrypted) powers* so that the server can recover all the missing powers, (i.e. the ones of exponent less than $D$) by *computing circuits of low multiplicative depth*. We will generalize a bit the discussion above, but don't worry, we'll take it step-by-step.

As you have seen, if the client sends the encryptions $\mathsf{Enc}(y^{k})$, for $k$ a power of $2$, the server can recover any missing power. This can be done by writing the exponent in base $2$ and by multiplying the received encrypted powers accordingly. But we can think of writing the exponent in a bigger base, let's say  $2^\ell$, for some parameter $\ell$ (which is ```ell```, in our implementation). Each term that appears in such a decomposition is of type $i\cdot 2^{\ell j}$, where $0 \leq i \leq 2^{\ell}-1$ and $0\leq j \leq \lfloor \mathsf{log}(D)/\ell\rfloor$. Therefore, the client should send $\mathsf{Enc}(y^k)$ for each such term $k$. Check the code for this [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/auxiliary_functions.py#L61).

For each batched plaintext $y$, the client sends $\mathsf{Enc}(y^{i \cdot 2^{\ell \cdot j}})$, for each $1 \leq i \leq 2^{\ell} -1$ and $0\leq j \leq \lfloor \mathsf{log}(D)/\ell\rfloor$. Notice that if $i=0$, then $y^{i\cdot 2^{\ell j}} =1$, hence no need of sending an encryption of $1$. :smile:

You can see how both batching and windowing work together [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/client_online.py#L67).

7. **Recover all powers**: The server computes all the necessary powers in order to evaluate the polynomials, see the code [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/auxiliary_functions.py#L45).

Given the $2^{\ell}$ base representation of $e$,

$$
  e = e_0 + 2^{\ell}\cdot e_1  + 2^{2\ell}\cdot e_2 + \ldots + 2^{\lfloor \mathsf{log}(D)/\ell\rfloor\ell} e_{\lfloor \mathsf{log}(D)/\ell\rfloor}
$$

where $0 \leq e_0, e_1,\ldots,e_{\lfloor \mathsf{log}(D)/\ell\rfloor} \leq 2^{\ell} -1$, we can compute

$$
\displaystyle y^e=\prod_{i=0}^{\lfloor \log (D)/\ell \rfloor} \left(y^{2^i} \right)^{e_i}.
$$

Therefore recovering $\mathsf{Enc}(y^e)$ for each such $e$ involves, in the worst case, multiplying $\lfloor \mathsf{log}(D)/\ell\rfloor+1$ (encrypted) powers. Therefore, the server computes a circuit of multiplicative depth of $\lceil\mathsf{log}(\lfloor\mathsf{log}(D)/\ell\rfloor+1)\rceil$! :smile:

You can check how this step is implemented [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/server_online.py#L80). 

!> This depth should be supported by the encryption scheme. So the parameters ```bin_capacity```, ```alpha``` and ```ell``` should be chosen so that 
$\lceil\mathsf{log}(\lfloor\mathsf{log}($```bin_capacity```/```alpha```$)$/```ell```$\rfloor+1)\rceil$ doesn't exceed the allowed depth of the scheme, which is $3$.

?> A tradeoff appears here in choosing the right ```ell```. Notice that the bigger ```ell```, the lower the depth of the circuit the server computes, i.e. *smaller computation time*, but the more powers the client needs to send, i.e *bigger communication cost*.
 
?> Another tradeoff is possible when choosing the right partitioning parameter ```alpha```. Notice that the bigger ```alpha```, the smaller the degree $D$ = ```bin_capacity```/```alpha```, i.e *lower computation time* on the server side, but the more ciphertexts the server needs to send, i.e. *bigger communication cost*.
 
8. **Doing the scalar product**: This is the last step  on the server side. The server evaluates the polynomials corresponding to the mini bins in a scalar-product fashion, as explained above. However, **due to batching**, this scalar product is a bit trickier; you can check the code [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/server_online.py#L94).


:exclamation: Recall that the [BFV](https://eprint.iacr.org/2012/144.pdf) encryption scheme that we use allows multiplying ciphertexts by plaintexts which means that

$$
\mathsf{Enc}(p \cdot m) \equiv p \cdot \mathsf{Enc}(m),
$$

for any $p$ and $m$ **polynomials** of degree less than ```poly_modulus_degree``` of coefficients modulo ```plain_modulus```. Hence TenSEAL allows multiplying ciphertexts by **vectors of integers** modulo ```plain_modulus```.

Let's recap all these steps and see how performing the scalar product  works in our example.

**Example:** Let's go back to the example where each mini bin has $2$ elements, which corresponds to a monic polynomial of degree $2$. Consider a mini batch of mini bins whose corresponding polynomials are $P_1 = X^2 + a_1X + a_0$ and $P_2 = X^2 + b_1X+b_0$. 

![](https://i.imgur.com/34YIWaY.png)

This means that the client encodes a batch $[y_1, y_2]$ as a plaintext $y$ and sends $\mathsf{Enc}(y)$. Because of windowing, the client also sends $\mathsf{Enc}(y^2)$ to the server. In this case, the server can *simultaneously* check if $y_1$ belongs to the first mini bin (i.e. $P_1$ evaluates to $0$ at $y_1$) and $y_2$ belongs to the second mini bin (i.e. $P_2$ evaluates to $0$ at $y_2$). Indeed, the server takes the first column of the mini batch and multiplies $\mathsf{Enc}(y^2)$ by it, takes the second column and multiplies $\mathsf{Enc}(y)$ by it and adds them to the third column:

$$
[1,1]\cdot \mathsf{Enc}(y^2) + [a_1, b_1] \cdot \mathsf{Enc}(y) + [a_0, b_0].
$$

This is the result that the server sends to the client. 

**In general**, for any mini batch, in order to evaluate the corresponding polynomials, the server computes the sum over $i$ of  $\mathsf{Enc}(y^i)\times (D+1-i)$-th column of the mini batch. In total, the server computes and then sends ```alpha``` $\cdot$ ```number_of_bins```/ ```poly_modulus_degree``` encrypted results to the client (Notice that the communication is increased by a factor of $\alpha$).

9. **Verdict**: It's time for the client to find out the intersection of the two lists of elements.

The client decrypts the results that he gets from the server and recovers a vector of integers (corresponding to the underlying polynomial plaintext). The client checks  if this vector contains any zeroes. A zero corresponds to an element from the intersection. To recover such an element we use the index where the zero is found. You can check how the client gets the intersection in the code [here](https://github.com/bit-ml/Private-Set-Intersection/blob/main/client_online.py#L132).

Let's go back to the example!

**Example**:  Recall that $P_1(X) = X^2 + a_1X+a_0$ and $P_2(X) = X^2 + b_1X+b_0$. Also, remember that $y$ was encoded from $[y_1, y_2].$ Due to the encoding, $y^2$ corresponds to $[y^2_1, y^2_2].$ Consider $p_2, p_1$, respectively $p_0$ the encodings of $[1,1], [a_1, b_1],$ respectively $[a_0, b_0]$. 

The server computes $p_2 \cdot \mathsf{Enc}(y^2) + p_1 \cdot \mathsf{Enc}(y) +p_0.$ and sends back the result to the client. When the client decrypts it, he gets the result $p_2 \cdot y^2 + p_1 \cdot y + p_0$, which, after batch decoding, equals to:

$$[1,1] \cdot [y^2_1, y^2_2] + [a_1, b_1] \cdot [y_1, y_2] + [a_0, b_0],$$

where the additions and multiplications are done component-wise, so the above computatation is equal to $[y_1^2+a_1\cdot y_1 + a_0, y_2^2+b_1\cdot y_2 + b_0]$ which is nothing but $[P_1(y_1), P_2(y_2)].$


### Setting the parameters

We know that we have introduced a lot of parameters along the way. :scream: Let's recap them a bit and see how we chose them in our implementation. :nerd_face:
* ```server_size```, ```client_size```: the sizes of server's and client's databases.
* ```sigma_max``` appears in the **OPRF** layer, as this step maps the database entries to ```sigma_max```-bit integers.
* ```number_of_hashes```, ```output_bits```, ```number_of_bins```, ```bin_capacity``` appear in hashing, as this step maps the previous integers, using ```number_of_hashes``` hash functions, to ```sigma_max``` - ```output_bits``` + $\lfloor \mathsf{log}($ ```number_of_hashes```$)\rfloor + 1$ -bit integers in ```number_of_bins``` bins. 
* ```alpha``` appears in partitioning, as server splits the  bins in ```alpha``` mini bins.
* ```plain_modulus```, ```poly_modulus_degree``` : parameters of the **HE**  scheme.
* ```ell``` used in windowing.

The elements from the both hash tables (client and server) are represented on 
```sigma_max``` - ```output_bits``` + $\lfloor \mathsf{log}($ ```number_of_hashes```$)\rfloor + 1$ bits. The **HE** scheme must be able to encrypt integers of this size, so we set: 

```sigma_max``` $\leq$ $\lfloor \mathsf{log}($```plain_modulus```$)\rfloor$ + ```output_bits``` - ($\lfloor \mathsf{log}($ ```number_of_hashes```$)\rfloor + 1)$.

Also, recall that recovering all the (encrypted) powers on the server side, we require

$\lceil\mathsf{log}(\lfloor\mathsf{log}($```bin_capacity```/```alpha```$)$/```ell```$\rfloor+1)\rceil \leq$ depth.

Let's choose a set of these parameters step-by-step:
* ```number_of_hashes``` = $3$.
* ```client_size``` = $5535$, so ```number_of_bins``` = $3/2 \cdot$ ```number_of_bins``` = $8192$. (Cuckoo hashing succeeds with probability $1 - 2^{-40}$; check **Hashing failures** [here](https://eprint.iacr.org/2017/299.pdf). 
* ```server_size``` = $2^{20}$, so ```bin_capacity``` = $536$. (Simple hashing succeeds with probability $1-2^{-30}$; check **Hashing failures** [here](https://eprint.iacr.org/2017/299.pdf)) or run the [bin capacity estimator script](https://github.com/bit-ml/Private-Set-Intersection/blob/main/bin_capacity_estimator.py).
* ```output_bits``` = $\mathsf{log}($```number_of_bins```$) = 13$.
* ```poly_modulus_degree``` = $8192$ and ```plain_modulus``` = $536903681$.  
* ```sigma_max``` = $40$.
* For safety, we can think of depth = $3$. If ```ell``` = $1$, ```alpha``` is lower bounded by $5$, since ```bin_capacity```/```alpha``` $\leq 128.$
 
?> We chose this $29$-bit ```plain_modulus``` to get ```sigma_max``` as large as possible. A large ```sigma_max``` guarantees that the protocol runs without any false-positives. For example, keeping ```client_size```$=5535$ and ```server_size```$=2^{20}$, a $52$-bit ```plain_modulus``` guarantees that the protocol can't give false-positives, except with probability less than $2^{-30}$. The current TenSEAL implementation does not allow us to choose a $52$-bit ```plain_modulus``` while keeping the ```poly_modulus_degree```$=8192$. 
 
### Let's play! :tada:

You can generate the datasets of the client and the server by running ```set_gen.py```. Then run ```server_offline.py``` and ```client_offline.py``` to preprocess them. Now go to the online phase of the protocol by running ```server_online.py``` and ```client_online.py```. Go check it out! :smile: