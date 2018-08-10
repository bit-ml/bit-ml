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
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 19.4vw;
  line-height: 0.75;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
  margin-top: -5px;

  ${breakpoint('tablet')`
    font-size: 7.2vw;
    margin-top: -3px;

    @media screen and (orientation:landscape) {
      margin-top: -5px;
    }
  `}

  ${breakpoint('desktop')`
    position: initial;
    top: initial;

    //font-size: 96px;
    //line-height: 78px;
    font-size: 7.3vw;
    margin-top: -8px;
  `}
`

const Description = styled.p`
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 1rem;

  ${breakpoint('tablet')`
    font-size: 2vh;
    padding: 0 2rem;

    @media screen and (orientation:landscape) {
      font-size: 2.4vh;
    }
  `}

  ${breakpoint('desktop')`
    font-size: 2.8vh;
    padding: 0 8vh;
    line-height: 4vh;
  `}
`

const Team = styled.p`
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 1rem;

  ${breakpoint('tablet')`
    padding: 0 2rem;
  `}

  ${breakpoint('desktop')`
    padding: 0 8vh;
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
