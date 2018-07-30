import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
import styled from 'styled-components'
//

import Head from 'components/Head'
import Page from 'components/Page'
import Hero from 'components/Hero'
import Specialty from 'components/Specialty'
import Project from 'components/Project'
import Bio from 'components/Bio'
import ResearchTeam from 'components/ResearchTeam'

// import logoImg from '../logo.png'


export const SpecialtyContainer = styled.div`
`


export default withRouteData(withSiteData(props => (
  <Page>
    <Head title={`Home | ${props.title}`}
      description={props.description} />

    <Hero props={props} />

    <SpecialtyContainer id="research">
      {props.specialties.map((specialty, i) => (
        <Specialty props={specialty} key={i} bgIdx={i}>

          { specialty.projects.map(Project) }

        </Specialty>
      ))}
    </SpecialtyContainer>

    <ResearchTeam id="team">
      {props.people.map(Bio)}
    </ResearchTeam>
  </Page>)
))
