import React from "react";
import * as PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import chunk from "lodash/chunk";
import Img from "gatsby-image";
import { rhythm } from "../utils/typography";

import Layout from "../components/layout";

const propTypes = {
  data: PropTypes.object.isRequired
};
// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 2;
}
const Product = ({ node }) => (
  <div>
    <Link to={`/${node.node_locale}/products/${node.contentful_id}/`}>
      <div>
        <div>
          {node.image && (
            <Img
              key={node.image.sizes.src}
              alt={node.image.title}
              sizes={node.image.sizes}
              loading="auto"
            />
          )}
        </div>
        <div>{node.title}</div>
        <div>{node.description.description}</div>
      </div>
    </Link>
  </div>
);

class IndexPage extends React.Component {
  constructor() {
    super();
    let postsToShow = 2;
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow;
    }

    this.state = {
      showingMore: postsToShow > 2,
      postsToShow
    };
  }
  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 2 });
    }
    this.ticking = false;
  }
  loadMorePosts = () => {
    console.log("clickmore", this.state.postsToShow);
    this.setState({
      postsToShow: this.state.postsToShow + 2,
      showingMore: true
    });
  };
  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  componentDidMount() {
    console.log("mout", this.state.postsToShow);

    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    console.log("unmount", this.state.postsToShow);

    window.removeEventListener(`scroll`, this.handleScroll);
    window.postsToShow = this.state.postsToShow;
  }

  render() {
    // const usProductEdges = this.props.data.us.edges;
    let usProductEdges = this.props.data.us;
    const posts = usProductEdges.edges.map(e => e.node);
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          <h3>en-US</h3>
          {/* {usProductEdges.map(({ node }, i) => (
            <Product node={node} key={node.id} />
          ))} */}
          {/* posts */}
          {console.log("component", this.state.postsToShow)}
          {chunk(posts.slice(0, this.state.postsToShow), 1).map((chunk, i) => (
            <div
              key={`chunk-${i}`}
              style={{ borderBottom: `${this.state.postsToShow}px solid red` }}
            >
              {chunk.map(node => (
                <Product node={node} key={node.id} />
              ))}
            </div>
          ))}
          {!this.state.showingMore && (
            <a data-testid="load-more" onClick={this.loadMorePosts}>
              Load More
            </a>
          )}
        </div>
      </Layout>
    );
  }
}

IndexPage.propTypes = propTypes;

export default IndexPage;

export const pageQuery = graphql`
  query PageEnUsQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    us: allContentfulPainting(filter: { node_locale: { eq: "en-US" } }) {
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
          image {
            title
            sizes(maxWidth: 614) {
              ...GatsbyContentfulSizes_tracedSVG
            }
          }
        }
      }
    }
  }
`;
