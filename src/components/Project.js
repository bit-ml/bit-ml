import { color, space, typography } from 'styled-system'

import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'

const Project = styled.div`
  ${breakpoint('tablet')`
    display: flex;
    align-items: center;
    min-height: 100vh;
  `}

  ${breakpoint('desktop')`
    display: flex;
    align-items: center;
    min-height: 100vh;
  `}
`

const ProjectContent = styled.section`
  display: inline-block;
  padding: 0 1rem;

  ${breakpoint('tablet')`
    padding: 0 5rem;
  `}

  ${breakpoint('desktop')`
    //padding: 0 15rem;
    padding: 0 24vmin;
  `}
`

const Heading = styled.h3`
  ${typography}
  ${color}
  ${space}
  letter-spacing: 0.03em;
  text-transform: uppercase;
`
Heading.defaultProps = {
  mt: 2,
  mb: 1,
  p: 0,
  fontFamily: 'title',
  fontSize: 4,
  fontWeight: 'titleSemi',
  lineHeight: 'copy',
  color: 'highContrast',
}

const Text = styled.p`
  ${typography}
  ${color}
  ${space}
  letter-spacing: 0.03em;
`
Text.defaultProps = {
  fontFamily: 'body',
  fontSize: 3,
  fontWeight: 'bodyMedium',
  lineHeight: 'small',
  color: 'highContrast',
}

const BibList = styled.ul`
  margin-top: 3rem;
  padding-left: 0;
`

const BibItem = styled.li`
  ${typography}
  padding: 0.5rem;
  list-style: none;
  letter-spacing: 0.03em;

  /* Gray 3 */
  color: #828282;

  &:hover {
    background-color: #e0dcdc;
    transition: background-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`
BibItem.defaultProps = {
  lineHeight: 'tiny',
}


const BibLink = styled.a`
  ${typography}
  ${color}
  font-style: italic;
`
BibLink.defaultProps = {
  fontFamily: 'body',
  fontSize: 1,
  fontWeight: 'bodyMedium',
  lineHeight: 'tiny',
  color: 'midContrast',
}


const BibAuthors = styled.span`
  font-style: normal;
  color: #e6212b;
`
const BibYear = styled.span`
  font-style: normal;
`

const BibPublished = styled.span`
  font-style: normal;
`

const BibEntry = ({
  authors, title, year, link, published,
}, i) => (
  <BibItem key={i}>
    <BibLink href={link} target="_blank">
      <BibAuthors>{authors}</BibAuthors>
      {`, ${title}, `}
      {published && <BibPublished>{`${published}, `}</BibPublished>}
      <BibYear>{year}</BibYear>
    </BibLink>
  </BibItem>
)

const Description = ({ children }) =>
  children.split('\n').map((line, key) => <Text key={key}>{line}</Text>)

export default ({ title, description, papers }, i) => (
  <Project key={i}>
    <ProjectContent>
      <Heading>{title}</Heading>
      <Description>{description}</Description>
      <BibList>{papers.map(BibEntry)}</BibList>
    </ProjectContent>
  </Project>
)
