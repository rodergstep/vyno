import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Grid from "@material-ui/core/Grid";
import Layout from "../components/layout";

class AboutPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    let aboutEdges = this.props.data.about.edges;
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          {aboutEdges.map((node, i) => {
            console.log(node);
            const { title, image, contentful_id, description } = node.node;
            return (
              <Grid key={i} container spacing={3}>
                <Grid item xs={12} lg={6}>
                  {image && <Img fluid={[{ ...image.fluid }]} fadeIn />}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <h1 className="paint__title">{title}</h1>
                  {description && (
                    <div
                      className="paint__descr"
                      dangerouslySetInnerHTML={{
                        __html: description.childMarkdownRemark.html
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default AboutPage;

export const pageQuery = graphql`
  query PageAboutQuery($lang: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    about: allContentfulPageAbout(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          contentful_id
          title
          image {
            contentful_id
            title
            fluid(maxWidth: 1000, quality: 90) {
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
`;
