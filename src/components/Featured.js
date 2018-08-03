import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


const FeaturedContainer = styled.div`
  background: rgba(24, 27, 42, 0.8);
  left: 0;
  bottom: -5px;
  position: absolute;
  width: 100%;

  ${breakpoint('desktop')`
    bottom: -5px;
  `}
`


const FeaturedWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 1rem;
  color: #fff;

  ${breakpoint('tablet')`
    padding: 0 5rem;
  `}

  ${breakpoint('desktop')`
    padding: 0 5rem;
  `}
`


const FeaturedLink = styled(Link)`
  background: rgba(98, 118, 207, 0);
  transition: all 0.2s cubic-bezier(0.25,0.46,0.45,0.94);

  color: #E4E4E4;
  &:hover {
    color: #fff;
    background: rgba(98, 118, 207, 0.3);
  }

  ${breakpoint('tablet')`
    flex-basis: 50%;
    padding: 1rem;
  `}

  ${breakpoint('desktop')`
    flex-basis: 50%;
    padding: 1rem;
  `}
`

const FeaturedHeading = styled.h2`
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #89cdf0;
`


const FeaturedSynopsis = styled.p`
  line-height: 1.4;
`


export default ({ posts }) => (
  <FeaturedContainer>
    <FeaturedWrapper>
      <FeaturedLink to="/blog/post/bitdefender_at_tmlss2018/">
        <FeaturedHeading>Bitdefender at TMLSS 2018</FeaturedHeading>
        <FeaturedSynopsis>Bitdefender participated with eight of its members
at the first edition of the Transylvania Machine Learning Summer School that
took place at the end of July 2018 in Cluj-Napoca.
        </FeaturedSynopsis>
      </FeaturedLink>
    </FeaturedWrapper>
  </FeaturedContainer>
)
