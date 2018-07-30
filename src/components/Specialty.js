import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


export const SpecialtyWrapper = styled.div`
  position: relative;

  ${breakpoint('desktop')`
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  `}
`

export const SpecialtyPanel = styled.div`
  background: ${props => props.bg};
  overflow: hidden;

  ${breakpoint('desktop')`
    position: sticky;
    top: 0;

    height: 100vh;
    width: 38%;
    overflow: hidden;
    left: 0;
    display: flex;
    flex-direction: column;

    .specItem {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
      justify-content: center;
    }
  `}

  .specialtyHeading {

  }
`

const Heading = styled.h2`
  //position: sticky;
  //top: 0;

  margin-top: 0;
  font-family: 'Bitter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 62px;
  line-height: 50px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);

  ${breakpoint('desktop')`
    position: initial;
    top: initial;

    line-height: 78px;
    font-size: 96px;
    margin-top: -3px;
  `}
`

const Description = styled.p`
  flex-grow: 10;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 300;
  line-height: 1.6rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0 1rem;

  ${breakpoint('desktop')`
    padding: 0 5rem;
    line-height: 2.25rem;
    font-size: 1.5rem;
  `}
`

const Team = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 1rem;

  ${breakpoint('desktop')`
    padding: 0 5rem;
  `}
`

const ProjectsWrapper = styled.div`
  ${breakpoint('desktop')`
    max-width: 62%;
  `}
`

const SpecialtyBg = ['#E6212B', '#00B2CB', '#12161E', '#C700CB']

export default ({ children, props, bgIdx }) => (
  <SpecialtyWrapper>
    <SpecialtyPanel bg={SpecialtyBg[bgIdx]}>
      <Heading className="specItem">{props.title} </Heading>
      <Description className="specItem">{props.description} </Description>
      <Team className="specItem">{props.people} </Team>
    </SpecialtyPanel>

    <ProjectsWrapper>
      {children}
    </ProjectsWrapper>

  </SpecialtyWrapper>
)
