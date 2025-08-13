import { color, space, typography } from 'styled-system'
import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

export const BioBox = styled.div`
  /* flex */
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 350px;
  padding: 0.6rem;

  /* grid */
  @supports (display: grid) {
    margin: 0;
  }

  /* flex for the media object */
  display: flex;
  align-items: flex-start;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${breakpoint('desktop')`
    &:hover {
      background-color: #fff;
      box-shadow: 0px 0px 17px -4px rgba(115,108,108,1);
      transform: scale(1.05);
      //transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

      div>a {opacity: 1}
    }
  `}
`

const MediaFigure = styled.figure`
  margin-right: 1rem;
  max-width: 96px;
  max-height: 96px;
  border-radius: 50%;
  border: 5px solid #fff;
  overflow: hidden;
`

const MediaBody = styled.div`
  flex: 1;
`

const Heading = styled.h4`
  font-family: "Exo 2", serif;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
`

const Bio = styled.p`
  ${typography}
  ${color}
  ${space}
`
Bio.defaultProps = {
  m: 0,
  p: 0,
  fontFamily: 'body',
  fontSize: 2,
  fontWeight: 1,
  lineHeight: 'small',
  color: 'midContrast',
}

const ContactBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 1rem;

  > a {
    width: 30%;
    text-align: center;
    font-size: 0.833rem;
    font-weight: normal !important;
    color: #828282 !important;
    padding: 0.1rem 0;
    border: 1px solid #edebeb;
    margin-right: 5px;
    margin-bottom: 5px;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &:hover {
      background-color: #edebeb;
    }
  }
  ${breakpoint('desktop')`
    >a {
      opacity: 0;
    }
  `}
`

export default ({
  name, bio, img, contact,
}, i) => (
  <BioBox key={i}>
    <MediaFigure>
      <img src={`./bio/${img || 'hal_9000.jpg'}`} alt={img} />
    </MediaFigure>
    <MediaBody>
      <Heading>{name} </Heading>
      <Bio>{bio} </Bio>

      <ContactBox>
        {contact.mail && <a href={`mailto:${contact.mail}`}>email</a>}
        {contact.github && (
          <a href={`https://github.com/${contact.github}`} target="_blank">github</a>
        )}
        {contact.twitter && (
          <a href={`https://twitter.com/${contact.twitter}`} target="_blank">twitter</a>
        )}
        {contact.website && (
          <a href={`https://${contact.website}`} target="_blank">website</a>
        )}
      </ContactBox>
    </MediaBody>
  </BioBox>
)
