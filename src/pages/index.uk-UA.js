import React from "react";
import * as PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { rhythm } from "../utils/typography";

import Layout from "../components/layout";

const propTypes = {
  data: PropTypes.object.isRequired
};

const Product = ({ node }) => (
  <div>
    <Link
      style={{ color: `inherit`, textDecoration: `none` }}
      to={`/${node.node_locale}/products/${node.contentful_id}/`}
    >
      <div>
        <div>
          {node.image && (
            <Img
              key={node.image.traced.src}
              alt={node.image.title}
              sizes={node.image.traced}
            />
          )}
        </div>
        <div>{node.title}</div>
      </div>
    </Link>
  </div>
);

class IndexPage extends React.Component {
  render() {
    var ukrProductEdges = [];
    if (this.props.data.ukr !== null) {
      ukrProductEdges = this.props.data.ukr.edges;
    }
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
          <h3>uk-UA</h3>
          {ukrProductEdges.map(({ node }, i) => (
            <Product node={node} key={node.id} />
          ))}
        </div>
      </Layout>
    );
  }
}

IndexPage.propTypes = propTypes;

export default IndexPage;

export const pageQuery = graphql`
  query PageDeQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    ukr: allContentfulPainting(filter: { node_locale: { eq: "uk-UA" } }) {
      edges {
        node {
          id
          contentful_id
          node_locale
          title
          year
          updatedAt(formatString: "")
          size
          description {
            description
          }
        }
      }
    }
  }
`;
