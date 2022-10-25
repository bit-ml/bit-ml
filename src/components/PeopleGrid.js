import React from 'react'
import styled from 'styled-components'


export const PeopleGrid = styled.div`
  /* flex */
  display: flex;
  flex-wrap: wrap;

  /* grid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 3rem;
`


export default ({ children, id }) => (
  <PeopleGrid id={id}>
    {children}
  </PeopleGrid>
)
