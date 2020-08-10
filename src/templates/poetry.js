import React from "react"
import { graphql } from "gatsby"
import { injectIntl } from "react-intl"
import Helmet from "react-helmet"
import Grid from "@material-ui/core/Grid"
import Structure from "../components/structure"

class PoetryPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let poetryEdges = this.props.data.poetry.edges
    return (
      <Structure>
        <Helmet
          title={this.props.intl.formatMessage({ id: "authorFullname" })}
          meta={[
            {
              name: "description",
              content: this.props.intl.formatMessage({ id: "seoDescr" }),
            },
            {
              name: "google-site-verification",
              content: "v8S_whAsK0Yp1f88Y5zMfcetW_koWN6hxM541_5zve8",
            },
          ]}
        />
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

export default injectIntl(PoetryPage)

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
