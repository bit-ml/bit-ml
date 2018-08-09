import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


export const SpecialtyWrapper = styled.div`
  position: relative;
  background: #EDEBEB;

  ${breakpoint('desktop')`
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  `}

  ${breakpoint('tablet')`
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
    left: 0;

    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 38%;
    overflow: hidden;

    .specItem {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
      justify-content: center;

      &.grows {
        display: flex;
        flex-grow: 20;
        align-items: center;
      }
    }
  `}

  ${breakpoint('tablet')`
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

      &.grows {
        display: flex;
        flex-grow: 20;
        align-items: center;
      }
    }
  `}

  .specialtyHeading {

  }
`

const Heading = styled.h2`
  //position: sticky;
  //top: 0;

  margin: 0;
  font-family: 'Bitter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 62px;
  line-height: 50px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);

  ${breakpoint('tablet')`
    font-size: 6vw;
    line-height: 5vw;
    margin-top: -2px;

    @media screen and (orientation:portrait) {
      margin-top: -7px;
    }
  `}

  ${breakpoint('desktop')`
    position: initial;
    top: initial;

    //font-size: 96px;
    //line-height: 78px;
    font-size: 6vw;
    line-height: 5vw;
    margin-top: -3px;
  `}
`

const Description = styled.p`
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0 1rem;

  ${breakpoint('tablet')`
    font-size: 3vmin;
    line-height: 5vmin;
    padding: 0 2rem;

    @media screen and (orientation:landscape) {
      //background: palevioletred;
    }
  `}

  ${breakpoint('desktop')`
    font-size: 2.4vmin;
    line-height: 4vmin;
    padding: 0 8.5vmin;

    //line-height: 2.25rem;
    //padding: 0 5rem;
  `}
`

const Team = styled.p`
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 1rem;

  ${breakpoint('tablet')`
    font-size: 2vmin;
    line-height: 3.8vmin;
    padding: 0 2rem;
  `}

  ${breakpoint('desktop')`
    //padding: 0 5rem;
    font-size: 1.8vmin;
    line-height: 3vmin;
    padding: 0 8.5vmin;
  `}
`

const ProjectsWrapper = styled.div`
  ${breakpoint('tablet')`
    max-width: 62%;
  `}

  ${breakpoint('desktop')`
    max-width: 62%;
  `}
`

const SpecialtyBg = ['#E6212B', '#00B2CB', '#12161E', '#C700CB']

export default ({ children, props, bgIdx }) => (
  <SpecialtyWrapper>
    <SpecialtyPanel bg={SpecialtyBg[bgIdx]}>
      <Heading className="specItem">{props.title} </Heading>
      <div className="specItem grows">
        <Description>{props.description} </Description>
      </div>
      <Team className="specItem">{props.people} </Team>
    </SpecialtyPanel>

    <ProjectsWrapper>
      {children}
    </ProjectsWrapper>

  </SpecialtyWrapper>
)
