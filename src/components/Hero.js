import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Featured from 'components/Featured'


export const Hero = styled.div`
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  background: #020100 url('/hero_avatar.jpg') no-repeat bottom;
  background-size: 1024px;
  background-position: -600px bottom;

  min-height: 92vh;
  @supports (-webkit-appearance:none) {
    min-height: calc(92vh - 56px);
  }

  ${breakpoint('tablet')`
    padding: 0 5rem;
    height: 95vh;
    background-size: contain;
    background-position: bottom;
    @media screen and (orientation:portrait) {
      background-size: 1512px;
      background-position: -700px bottom;
    }
  `}

  ${breakpoint('desktop')`
    padding: 0 5rem;
    height: 95vh;
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
  font-size: 32px;
  line-height: 2.7rem;
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

    <Featured props={props} />
  </Hero>
)
