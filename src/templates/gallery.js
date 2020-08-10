import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage, injectIntl } from "react-intl"
import Helmet from "react-helmet"
import { AppConsumer } from "../utils/context"
import Grid from "@material-ui/core/Grid"
import chunk from "lodash/chunk"
import filter from "lodash/filter"
import Structure from "../components/structure"
import Paint from "../components/paint"

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 4
}

class GalleryPage extends React.Component {
  constructor(props) {
    super(props)
    let postsToShow = 4
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      posts: [],
      filteredPosts: [],
      filteredValue: "all",
      showingMore: postsToShow > 4,
      postsToShow,
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 4 })
    }
    this.ticking = false
  }
  loadMorePosts = () => {
    this.setState({
      postsToShow: this.state.postsToShow + 4,
      showingMore: true,
    })
  }
  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true)
    const posts = this.props.data.home.edges.map(e => e.node)
    this.setState(state => ({
      posts: posts,
      filteredPosts: state.filteredValue === "all" ? posts : state.filterPosts,
    }))
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  filterPosts = filteredValue => {
    if (filteredValue === "all") {
      this.setState(state => ({ filteredPosts: state.posts, filteredValue }))
    } else {
      const filteredPosts = filter(this.state.posts, function(o) {
        return o.method && o.method.name === filteredValue
      })
      this.setState(state => ({ filteredPosts, filteredValue }))
    }
  }

  render() {
    let methods = this.props.data.methods.edges
    const filteredPosts = this.state.filteredPosts
    return (
      <AppConsumer>
        {context => {
          return (
            <Structure pageclass="page-gallery">
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
                <div className="filter">
                  <ul className="filter__list">
                    <li
                      className={`filter__list-item ${
                        this.state.filteredValue === "all" ? "is-active" : ""
                      }`}
                      onClick={() => this.filterPosts("all")}
                    >
                      <FormattedMessage id="filterValueAll" />
                    </li>
                    {methods.length &&
                      methods.map(m => (
                        <li
                          className={`filter__list-item ${m.node.name ===
                            this.state.filteredValue && "is-active"}`}
                          key={m.node.id}
                          onClick={() => this.filterPosts(m.node.name)}
                        >
                          {m.node.name}
                        </li>
                      ))}
                  </ul>
                  <div className="fiter__total">
                    {filteredPosts.length} <FormattedMessage id="filterFrom" />{" "}
                    {this.state.posts.length}
                  </div>
                </div>
                <div className="gallery__contr">
                  {filteredPosts.length ? (
                    chunk(
                      filteredPosts.slice(0, this.state.postsToShow),
                      2
                    ).map((chunk, i) => (
                      <Grid container spacing={3} key={`chunk-${i}`}>
                        {chunk.map(node => {
                          return (
                            <Grid key={node.id} item xs={12} md={6}>
                              <Paint post={node} key={node.id} />
                            </Grid>
                          )
                        })}
                      </Grid>
                    ))
                  ) : (
                    <span>Картини у цю категорію іще не були додані</span>
                  )}
                  {!this.state.showingMore && filteredPosts.length > 4 && (
                    <div className="btn-load-more">
                      <button
                        className="btn secondary"
                        onClick={this.loadMorePosts}
                      >
                        <FormattedMessage id="loadMore" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Structure>
          )
        }}
      </AppConsumer>
    )
  }
}

export default injectIntl(GalleryPage)

export const pageQuery = graphql`
  query PageGalleryQuery($lang: String!) {
    home: allContentfulPainting(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          id
          ...Painting
        }
      }
    }
    methods: allContentfulMethod(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`
