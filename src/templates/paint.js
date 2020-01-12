import React from "react"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Img from "gatsby-image"
import { FormattedMessage, useIntl } from "react-intl"
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded"
import Layout from "../components/layout"
import { AppConsumer } from "../utils/context"

const PaintTemplate = props => {
  const paint = props.data.contentfulPainting
  const { title, year, image, size, description, method } = paint
  return (
    <Layout data={props.data} location={props.location}>
      <AppConsumer>
        {contextData => {
          return (
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                {image && <Img fluid={[{ ...image.fluid }]} fadeIn />}
              </Grid>
              <Grid item xs={12} lg={4}>
                <AniLink
                  cover
                  bg="linear-gradient(to right, #757f9a, #d7dde8)"
                  direction="left"
                  to={`/${contextData.locale}/`}
                  className="backlink d-flex align-center"
                >
                  <ChevronLeftRoundedIcon />
                  <FormattedMessage id="backlink" />
                </AniLink>
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
          )
        }}
      </AppConsumer>
    </Layout>
  )
}

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
