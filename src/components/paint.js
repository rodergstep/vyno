import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

let touched = false

class Paint extends React.Component {
  constructor() {
    super()
    this.state = {
      hovering: false,
    }
  }

  render() {
    const { image, title, slug, node_locale } = this.props.post
    return (
      <Link
        to={`/${node_locale}/paints/${slug}/`}
        onTouchStart={() => (touched = true)}
        onMouseEnter={() => {
          if (!touched) {
            this.setState({ hovering: true })
          }
        }}
        onMouseLeave={() => {
          if (!touched) {
            this.setState({ hovering: false })
          }
        }}
      >
        <figure className="figure">
          {image && (
            <Img fluid={[{ ...image.fluid }]} fadeIn className="figure__pic" />
          )}
          <figcaption className="figure__title">{title}</figcaption>
        </figure>
      </Link>
    )
  }
}

export default Paint

export const postFragment = graphql`
  fragment Painting on ContentfulPainting {
    size
    node_locale
    title
    slug
    year
    updatedAt(formatString: "")
    image {
      title
      fluid(maxWidth: 1000, quality: 70) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`
