import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


export const ResearchTeam = styled.div`
  /* flex */
  display: flex;
  flex-wrap: wrap;

  /* grid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 3rem;

  padding: 6rem 1rem;
  background: #F5F2F2;

  ${breakpoint('desktop')`
    padding: 10rem 5rem;
  `}
`


export default ({ children, id }) => (
  <ResearchTeam id={id}>
    {children}
  </ResearchTeam>
)
