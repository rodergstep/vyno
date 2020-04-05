import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Grid from "@material-ui/core/Grid"
import Structure from "../components/structure"

class AboutPage extends React.Component {
  constructor() {
    super()
  }

  render() {
    let aboutEdges = this.props.data.about.edges
    return (
      <Structure>
        <div className="container">
          {aboutEdges.map((node, i) => {
            const { title, image, contentful_id, description } = node.node
            return (
              <Grid key={i} container spacing={3}>
                <Grid item xs={12} lg={6}>
                  {image && (
                    <Img
                      fluid={[{ ...image.fluid }]}
                      className="about__person"
                      fadeIn
                    />
                  )}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <h1 className="paint__title">{title}</h1>
                  {description && (
                    <div
                      className="paint__descr"
                      dangerouslySetInnerHTML={{
                        __html: description.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            )
          })}
        </div>
      </Structure>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query PageAboutQuery($lang: String!) {
    about: allContentfulPageAbout(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          contentful_id
          title
          image {
            contentful_id
            title
            fluid(maxWidth: 1000, quality: 70) {
              ...GatsbyContentfulFluid
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
