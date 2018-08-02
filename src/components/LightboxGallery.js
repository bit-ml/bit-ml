import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import styled from 'styled-components'



const LightboxGalleryWrapper = styled.div`
  padding: 2rem;
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
          theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
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


export default ({ photo_set }) => (
  <LightboxGalleryWrapper>
    <LightboxGallery photos={photo_set} columns={4} />
  </LightboxGalleryWrapper>
)
