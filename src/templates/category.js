import React from "react";
import * as PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { rhythm } from "../utils/typography";

import Layout from "../components/layout";

const propTypes = {
  data: PropTypes.object.isRequired
};

class CategoryTemplate extends React.Component {
  render() {
    const paint = this.props.data.contentfulPainting;
    const {
      title: { title },
      methods
    } = paint;
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          <h1>{title}</h1>
          <div>
            <span>paints</span>
            {/* <ul>
              {methods &&
                methods.map((p, i) => (
                  <li key={i}>
                    <Link to={`/${p.node_locale}/methodss/${p.contentful_id}`}>
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul> */}
          </div>
        </div>
      </Layout>
    );
  }
}

CategoryTemplate.propTypes = propTypes;

export default CategoryTemplate;

export const pageQuery = graphql`
  query paintQueryCat($id: String!) {
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
    }
  }
`;
