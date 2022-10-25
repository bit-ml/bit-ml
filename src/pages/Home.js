import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
import styled from 'styled-components'
import { color, space, typography } from 'styled-system'
import breakpoint from 'styled-components-breakpoint'
//

import Head from 'components/Head'
import Nav from 'components/Navigation'
import Page from 'components/Page'
import Hero from 'components/Hero'
import Specialty from 'components/Specialty'
import Project from 'components/Project'
import Bio from 'components/Bio'
import PeopleGrid from 'components/PeopleGrid'

// import logoImg from '../logo.png'


const SpecialtyContainer = styled.div`
`

const TeamsContainer = styled.div`
  background: #F5F2F2;

  padding: 6rem 1rem;
  ${breakpoint('tablet')`
    padding: 10rem 5rem;

    @media screen and (orientation:portrait) {
      padding: 10rem 10rem;
    }
  `}

  ${breakpoint('desktop')`
    padding: 10rem 5rem;
  `}
`

const TeamHeading = styled.h3`
  ${typography}
  ${color}
  letter-spacing: 0.03em;
  text-transform: uppercase;
`
TeamHeading.defaultProps = {
  mt: 2,
  mb: 1,
  p: 0,
}

const SubTeamHeading = styled.h5`
  ${typography}
  ${color}
  letter-spacing: 0.03em;
  text-transform: uppercase;
`
SubTeamHeading.defaultProps = {
  mt: 2,
  mb: 1,
  p: 0,
  color: 'midContrast'
}

export default withRouteData(withSiteData(props => (
  <div>
    <Head
      title={`${props.title} | ${props.tagline}`}
      description={props.description}
      tagline={props.tagline}
      tags={props.tags}
      image="https://bit-ml.github.io/tile.png" />

    <Nav pageName="home" />

    <Page>
      <Hero props={props} />

      <SpecialtyContainer id="research">
        {props.specialties.map((specialty, i) => (
          <Specialty props={specialty} key={i} bgIdx={i}>

            {specialty.projects.map(Project)}

          </Specialty>
        ))}
      </SpecialtyContainer>


      <TeamsContainer id="teams">
        {props.teams.map((team) => (
          <div>
            <TeamHeading>{team.direction}</TeamHeading>
            {Object.entries(team.subteams).map(([subteamName, people], i) => (
              <div key={i}>
                <SubTeamHeading>{subteamName}</SubTeamHeading>
                <PeopleGrid id={subteamName}>
                  {people.map(Bio)}
                </PeopleGrid>
              </div>
            ))}
          </div>
        ))}
      </TeamsContainer>

    </Page>
  </div >)
))
