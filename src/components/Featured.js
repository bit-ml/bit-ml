import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const FeaturedContainer = styled.div`
  background: rgba(24, 27, 42, 0.8);
  left: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
`

const FeaturedWrapper = styled.div`
  margin: 0 auto;
  padding: 0 2.2rem;
  padding-bottom: 0.5rem;
  color: #fff;
  .carousel {
    height: 35vh;
  }

  ${breakpoint('tablet')`
    padding: 0 5rem;
  `}

  ${breakpoint('desktop')`
    padding: 0 5rem;

    .carousel {
      height: 33vh;
    }
  `}
`

const FeaturedLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;

  background: rgba(98, 118, 207, 0);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #e4e4e4;

  &:hover {
    color: #fff;
    background: rgba(98, 118, 207, 0.3);
  }

  // ${breakpoint('tablet')`
  //   padding: 2rem;
  // `}

  ${breakpoint('desktop')`
    padding: 2rem 3rem;
  `}
`

const FeaturedHeading = styled.h2`
  font-family: "Exo 2", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.32rem;
  margin: 0.4rem 0 0 0;
  color: #89cdf0;

  ${breakpoint('tablet')`
    font-size: 1.4rem;
    line-height: 2rem;
  `}

  ${breakpoint('desktop')`
    font-size: 1.4rem;
    line-height: 2rem;
  `}
`

const FeaturedSynopsis = styled.p`
  font-size: 0.833rem;
  font-weight: 300;
  line-height: 1.4;
  color: #fff;
  line-height: 1rem;

  ${breakpoint('tablet')`
    font-size: 1rem;
    line-height: 1.4;
  `}

  ${breakpoint('desktop')`
    font-size: 1rem;
    line-height: 1.4;
  `}
`

const StyledButtonBack = styled(ButtonBack)`
  position: absolute;
  top: 50%;
  left: -5px;
  margin-left: 10px;
  margin-top: -20px;

  width: 40px;
  height: 40px;
  padding: 10px;
  background: none;
  border: none;
  outline: none;
  border-radius: 40px;

  ${breakpoint('tablet')`
    left: 10px;
    width: 70px;
    height: 70px;
    padding: 15px;
  `}

  ${breakpoint('desktop')`
    left: 10px;
    width: 70px;
    height: 70px;
    padding: 15px;
  `}
`
const StyledButtonNext = styled(ButtonNext)`
  position: absolute;
  top: 50%;
  right: -5px;
  margin-right: 10px;
  margin-top: -20px;

  width: 40px;
  height: 40px;
  padding: 10px;
  background: none;
  border: none;
  outline: none;
  border-radius: 40px;

  ${breakpoint('tablet')`
    right: 10px;
    width: 70px;
    height: 70px;
    padding: 15px;
  `}

  ${breakpoint('desktop')`
    right: 10px;
    width: 70px;
    height: 70px;
    padding: 15px;
  `}
`

export default ({ posts }) => (
  <FeaturedContainer>
    <FeaturedWrapper>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={5}
      >
        <Slider>
          <Slide index={0}>
            {
              <FeaturedLink to="/blog/post/homomorphic-encryption-toy-implementation-in-python/">
                <FeaturedHeading>
                  Homomorphic Encryption: a Toy Implementation in Python
                </FeaturedHeading>
                <FeaturedSynopsis>
                  Curious about how to work with data you can't see? In the
                  this blog post we are going to broadly explain what
                  Homomorphic Encryption is and how to implement a particular
                  scheme.
                </FeaturedSynopsis>
              </FeaturedLink>
            }
          </Slide>
          <Slide index={1}>
            {
              <FeaturedLink to="/teaching/lectures-and-courses/">
                <FeaturedHeading>
                  Bitdefender courses in Deep Learning and Crypto
                </FeaturedHeading>
                <FeaturedSynopsis>
                  Check out some of the courses delivered by our team in
                  collaboration with top Universities in Bucharest. Includes
                  slides and notebooks.
                </FeaturedSynopsis>
              </FeaturedLink>
            }
          </Slide>
          <Slide index={2}>
            {
              <FeaturedLink to="/blog/post/recurrent-space-time-graph-neural-nets/">
                <FeaturedHeading>
                  Recurrent Space-time Graph Neural Network
                </FeaturedHeading>
                <FeaturedSynopsis>
                  We introduce our recurrent graph model designed for video
                  processing from our paper that will be presented at NeurIPS
                  2019 in Vancouver.
                </FeaturedSynopsis>
              </FeaturedLink>
            }
          </Slide>
          <Slide index={3}>
            {
              <FeaturedLink to="/blog/post/bitdefender_at_eeml2019/">
                <FeaturedHeading>Bitdefender at EEML 2019</FeaturedHeading>
                <FeaturedSynopsis>
                  Read about our team's experience of organizing and
                  participating at Eastern European Machine Learning summer
                  school in Bucharest.
                </FeaturedSynopsis>
              </FeaturedLink>
            }
          </Slide>
          <Slide index={4}>
            {
              <FeaturedLink to="/blog/post/bitdefender_at_tmlss2018/">
                <FeaturedHeading>Bitdefender at TMLSS 2018</FeaturedHeading>
                <FeaturedSynopsis>
                  Bitdefender participated at the first edition of the
                  Transylvania Machine Learning Summer School that took place in
                  Cluj-Napoca.
                </FeaturedSynopsis>
              </FeaturedLink>
            }
          </Slide>
        </Slider>
        <StyledButtonBack>
          {
            <span>
              <svg
                fill="#fff"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                space="preserve"
              >
                <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z" />
              </svg>
            </span>
          }
        </StyledButtonBack>
        <StyledButtonNext>
          {
            <span>
              <svg
                fill="#fff"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                space="preserve"
              >
                <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z" />
              </svg>
            </span>
          }
        </StyledButtonNext>
      </CarouselProvider>
    </FeaturedWrapper>
  </FeaturedContainer>
)

// export default ({ posts }) => (
//   <FeaturedContainer>
//     <FeaturedWrapper>
//      {<FeaturedLink to="/blog/post/recurrent-space-time-graph-neural-nets/">
//         <FeaturedHeading>Recurrent Space-time Graph Neural Network</FeaturedHeading>
//         <FeaturedSynopsis>We introduce our recurrent graph model designed for
//         video processing from our new paper that will be presented at NeurIPS
//         2019 in Vancouver.
//         </FeaturedSynopsis>
//       </FeaturedLink>}
//      {<FeaturedLink to="/blog/post/bitdefender_at_eeml2019/">
//         <FeaturedHeading>Bitdefender at EEML 2019</FeaturedHeading>
//         <FeaturedSynopsis>Read about our team's experience of organizing and
//         participating at Eastern European Machine Learning summer school in
//         Bucharest.
//         </FeaturedSynopsis>
//       </FeaturedLink>}
//       <FeaturedLink to="/blog/post/bitdefender_at_tmlss2018/">
//         <FeaturedHeading>Bitdefender at TMLSS 2018</FeaturedHeading>
//         <FeaturedSynopsis>Bitdefender participated at the first edition of
//         the Transylvania Machine Learning Summer School that took place in
//         Cluj-Napoca.
//         </FeaturedSynopsis>
//       </FeaturedLink>
//     </FeaturedWrapper>
//   </FeaturedContainer>
// )
