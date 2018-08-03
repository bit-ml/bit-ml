import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


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
  font-family: 'Exo 2', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 37px;
  font-size: 22px;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  /* Gray 1 */
  color: #333333;
`

const Text = styled.p`
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  font-size: 16px;
  letter-spacing: 0.03em;

  /* Gray 1 */
  color: #333333;
`

const BibList = styled.ul`
  margin-top: 3rem;
  padding-left: 0;

  li>a {
    font-weight: normal;
    color: inherit;
  }
`

const BibItem = styled.li`
  padding: .5rem;
  list-style: none;
  font-family: Roboto;
  font-style: italic;
  font-weight: 400;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 0.03em;

  /* Gray 3 */
  color: #828282;

  &:hover {
    background-color: #e0dcdc;
    transition: background-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`
const BibLink = styled.a`
`
const BibAuthors = styled.span`
  font-style: normal;
  color: #E6212B;
`
const BibYear = styled.span`
  font-style: normal;
`

const BibEntry = ({ authors, title, year, link }, i) => (
  <BibItem key={i}>
    <BibLink href={link} target="_blank">
      <BibAuthors>{authors}</BibAuthors>
      {`, ${title}, `}
      <BibYear>{year}</BibYear>
    </BibLink>
  </BibItem>
)


const Description = ({ children }) => (
  children.split('\n').map((line, key) => (
    <Text key={key}>{line}</Text>
  ))
)

export default ({ title, description, papers }, i) => (
  <Project key={i}>
    <ProjectContent>
      <Heading>{title}</Heading>
      <Description>{description}</Description>
      <BibList>
        {papers.map(BibEntry)}
      </BibList>
    </ProjectContent>
  </Project>
)
