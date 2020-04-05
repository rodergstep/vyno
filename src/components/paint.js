import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import AniLink from "gatsby-plugin-transition-link/AniLink"

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
      <AniLink fade to={`/${node_locale}/paints/${slug}/`}>
        <figure className="figure">
          {image && (
            <Img fluid={[{ ...image.fluid }]} fadeIn className="figure__pic" />
          )}
          <figcaption className="figure__title">{title}</figcaption>
        </figure>
      </AniLink>
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
    method {
      name
    }
    image {
      title
      fluid(maxWidth: 1000, quality: 70) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`
