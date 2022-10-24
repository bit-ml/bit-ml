import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
import styled from 'styled-components'
//

import Head from 'components/Head'
import Nav from 'components/Navigation'
import Page from 'components/Page'
import Hero from 'components/Hero'
import Specialty from 'components/Specialty'
import Project from 'components/Project'
import Bio from 'components/Bio'
import ResearchTeam from 'components/ResearchTeam'

// import logoImg from '../logo.png'


const SpecialtyContainer = styled.div`
`


// const TeamContainer = styled.div`
// `

// import { color, space, typography } from 'styled-system'
// const Heading = styled.h3`
//   ${typography}
//   ${color}
//   letter-spacing: 0.03em;
//   text-transform: uppercase;
// `
// Heading.defaultProps = {
//   mt: 2,
//   mb: 1,
//   p: 0,
// }

// const HeadingSmall = styled.h5`
//   ${typography}
//   ${color}
//   letter-spacing: 0.03em;
//   text-transform: uppercase;
// `
// HeadingSmall.defaultProps = {
//   mt: 2,
//   mb: 1,
//   p: 0,
// }

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



      {/* <TeamContainer id="teams">
        {props.teams.map((subteam) => (
          <ResearchTeam id={subteam.id}>
            <Heading>{subteam.direction}</Heading>
            {subteam.team.core.map(Bio)}

            <HeadingSmall>Interns</HeadingSmall>
            {subteam.team.interns.map(Bio)}

            <HeadingSmall>Collaborators</HeadingSmall>
            {subteam.team.collabs.map(Bio)}
          </ResearchTeam>
        ))}
      </TeamContainer>
       */}


      <ResearchTeam id="team">
        {props.people.map(Bio)}
      </ResearchTeam>
    </Page>
  </div>)
))
