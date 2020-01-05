import React from "react";
import * as PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { FormattedMessage } from "react-intl";

import Layout from "../components/layout";

const propTypes = {
  data: PropTypes.object.isRequired
};

class ProductTemplate extends React.Component {
  render() {
    const paint = this.props.data.contentfulPainting;
    const { title, year, image, size, description, method } = paint;
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          <h1>{title}</h1>
          <div>
            <span>
              <FormattedMessage id="price" />: ${size}
            </span>
            {description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: description.childMarkdownRemark.html
                }}
              />
            )}
            <div>
              <span>See other: </span>
              {/* <ul>
                {categories.map((category, i) => (
                  <li key={i}>
                    <Link
                      key={i}
                      to={`/${category.node_locale}/categories/${category.contentful_id}`}
                    >
                      {category.title.title}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

ProductTemplate.propTypes = propTypes;

export default ProductTemplate;

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
    }
  }
`;
