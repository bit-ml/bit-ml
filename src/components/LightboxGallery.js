import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'


const LightboxGalleryWrapper = styled.div`
  background-color: ${props => props.theme.colors.tintedBackground};
  padding: 1rem;
  margin: 1rem 0;
`


class LightboxGallery extends React.Component {
  constructor () {
    super()
    this.state = { currentImage: 0 }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }

  openLightbox (event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  render () {
    return (
      <div>
        <Gallery
          photos={this.props.photos}
          columns={this.props.columns}
          onClick={this.openLightbox} />
        <Lightbox
          theme={this.props.theme}
          images={this.props.photos.map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={1600}
          />
      </div>
    )
  }
}

const theme = {
  // container
  container: {
    background: 'rgba(255, 255, 255, 0.9)',
  },

  // arrows
  arrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1,
    },
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15,
    },
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },
  close: {
    fill: '#D40000',
    opacity: 0.6,
    transition: 'all 200ms',
    ':hover': {
      opacity: 1,
    },
  },

  // footer
  footer: {
    color: 'black',
  },
  footerCount: {
    color: 'rgba(0, 0, 0, 0.6)',
  },

  // thumbnails
  thumbnail: {},
  thumbnail__active: {
    boxShadow: '0 0 0 2px #00D8FF',
  },
}


export default ({ photo_set, columns }) => (
  <LightboxGalleryWrapper>
    <LightboxGallery photos={photo_set} columns={columns} theme={theme} />
  </LightboxGalleryWrapper>
)
