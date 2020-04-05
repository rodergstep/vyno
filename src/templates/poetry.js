import React from "react"
import { graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Structure from "../components/structure"

class PoetryPage extends React.Component {
  constructor() {
    super()
  }

  render() {
    let poetryEdges = this.props.data.poetry.edges
    return (
      <Structure>
        <div className="container">
          {poetryEdges.map((node, i) => {
            const { title, poems } = node.node
            return (
              <Grid key={i} container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <h1 className="paint__title">{title}</h1>
                  {poems && (
                    <div
                      className="paint__descr"
                      dangerouslySetInnerHTML={{
                        __html: poems.childMarkdownRemark.html,
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

export default PoetryPage

export const pageQuery = graphql`
  query PagePoetryQuery($lang: String!) {
    poetry: allContentfulPagePoetry(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          contentful_id
          title
          poems {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
