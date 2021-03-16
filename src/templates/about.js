import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Grid from "@material-ui/core/Grid"
import { injectIntl } from "react-intl"
import Helmet from "react-helmet"
import Structure from "../components/structure"
import Image from "../components/image"

class AboutPage extends React.Component {
  constructor(props) {
    super(props)
    this.imgPathArr = [
      "artistic_ukraine.jpg",
      "fabiano_2017_page_570.jpg",
      "fabiano_2017.jpg",
      "fabiano_2020_cert.jpg",
      "fabiano_2020.jpg",
      "gallery_k.jpg",
      "kyiv_catalog.jpg",
      "vynogradov_dyplom.jpg",
      "sea_aquarelle.jpg",
      "certificate_more_aquarely_2018.jpg",
      "yalta_catalog_obklad.jpg",
      "yalta_catalog_tytul.jpg",
      "yalta_catalog_work1.jpg",
      "certificate_fabiano_2017.jpg",
      "katalog_mini_page.jpg",
      'miniwatercolor_2020_0.jpg',
      'miniwatercolor_2020_1.jpg',
    ]
  }

  render() {
    let aboutEdges = this.props.data.about.edges
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
          {aboutEdges.map((node, i) => {
            const {
              title,
              image,
              contentful_id,
              description,
              exhibitions,
            } = node.node
            return (
              <div>
                <Grid key={i} container spacing={3}>
                  <Grid item xs={12} lg={6}>
                    {image && (
                      <Img
                        fluid={[{ ...image.fluid }]}
                        className="about__person"
                        fadeIn
                        style={{ maxHeight: "80vh" }}
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
                <div className="about__dyplomas">
                  <h3
                    className="paint__title"
                    dangerouslySetInnerHTML={{
                      __html: exhibitions.childMarkdownRemark.html,
                    }}
                  />
                  <Grid key={i} container spacing={3}>
                    {this.imgPathArr.map(
                      imgName =>
                        imgName && (
                          <Grid item xs={12} lg={6}>
                            <Image
                              key={imgName}
                              fileName={`dyplomy/${imgName}`}
                              className="about__dyplom"
                            />
                          </Grid>
                        )
                    )}
                  </Grid>
                </div>
              </div>
            )
          })}
        </div>
      </Structure>
    )
  }
}

export default injectIntl(AboutPage)

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
          exhibitions {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
