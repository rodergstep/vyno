import React from "react"
import * as PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded"
import Layout from "../components/layout"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class PaintTemplate extends React.Component {
  render() {
    const paint = this.props.data.contentfulPainting
    const { title, year, image, size, description, method } = paint
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              {image && <Img fluid={[{ ...image.fluid }]} fadeIn />}
            </Grid>
            <Grid item xs={12} lg={4}>
              <Link to="/" className="backlink d-flex align-center">
                <ChevronLeftRoundedIcon />
                <FormattedMessage id="backlink" />
              </Link>
              <h1 className="paint__title">{title}</h1>
              <div className="paint__info">
                {size && (
                  <span>
                    <FormattedMessage id="paintSize" />: {size}
                  </span>
                )}
                {year && (
                  <span>
                    <FormattedMessage id="paintYear" />: {year}
                  </span>
                )}
                {method && (
                  <span>
                    <FormattedMessage id="paintMethod" />: {method}
                  </span>
                )}
              </div>
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
        </div>
      </Layout>
    )
  }
}

PaintTemplate.propTypes = propTypes

export default PaintTemplate

export const pageQuery = graphql`
  query paintQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    contentfulPainting(id: { eq: $id }) {
      id
      title
      year
      updatedAt(formatString: "")
      size
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        contentful_id
        title
        fluid(maxWidth: 1000, quality: 70) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
