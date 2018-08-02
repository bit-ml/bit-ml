import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


export const Hero = styled.div`
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  height: 95vh;
  padding: 0 1rem;
  background: #020100 url('/hero_avatar.jpg') no-repeat bottom;
  background-size: 1024px;
  background-position: -600px bottom;

  ${breakpoint('tablet')`
    padding: 0 5rem;
    background-size: contain;
    background-position: bottom;
    @media screen and (orientation:portrait) {
      background-size: 1512px;
      background-position: -700px bottom;
    }
  `}

  ${breakpoint('desktop')`
    padding: 0 5rem;
    background-size: contain;
    background-position: bottom;

    @media screen and (orientation:portrait) {
      background-size: 2048px;
      background-position: -700px bottom;
    }
  `}
`

const Heading = styled.h1`
  max-width: 800px;
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 3rem;
  color: #E4E4E4;

  ${breakpoint('tablet')`
    font-size: 64px;
    line-height: 92px;
  `}

  ${breakpoint('desktop')`
    font-size: 64px;
    line-height: 92px;
  `}
`


export default ({ props }) => (
  <Hero>
    <Heading>{props.tagline} </Heading>
  </Hero>
)
