import React from "react";
import { graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import chunk from "lodash/chunk";
import Layout from "../components/layout";
import Paint from "../components/paint";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 4;
}

class HomePage extends React.Component {
  constructor() {
    super();
    let postsToShow = 4;
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow;
    }

    this.state = {
      showingMore: postsToShow > 4,
      postsToShow
    };
  }
  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 4 });
    }
    this.ticking = false;
  }
  loadMorePosts = () => {
    this.setState({
      postsToShow: this.state.postsToShow + 4,
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
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
    window.postsToShow = this.state.postsToShow;
  }

  render() {
    let homePaintEdges = this.props.data.home.edges;
    const posts = homePaintEdges.map(e => e.node);
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          {chunk(posts.slice(0, this.state.postsToShow), 2).map((chunk, i) => (
            <Grid container spacing={2} key={`chunk-${i}`}>
              {chunk.map(node => {
                return (
                  <Grid key={node.id} item xs={12} md={6}>
                    <Paint post={node} key={node.id} />
                  </Grid>
                );
              })}
            </Grid>
          ))}
          {!this.state.showingMore && (
            <div className="btn-load-more">
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.loadMorePosts}
              >
                <FormattedMessage id="loadMore" />
              </Button>{" "}
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default HomePage;

export const pageQuery = graphql`
  query PageHomeQuery($lang: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    home: allContentfulPainting(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          id
          ...Painting
        }
      }
    }
  }
`;
