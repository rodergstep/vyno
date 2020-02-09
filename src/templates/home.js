import React from "react"
import { graphql } from "gatsby"
import { TweenLite, TimelineLite, Power1 } from "gsap"
import { AppConsumer } from "../utils/context"
import Image from "../components/image"
import Structure from "../components/structure"

class HomePage extends React.Component {
  constructor() {
    super()

    this.state = {
      pageclass: "page-home",
    }

    this.transitionCover = null
    this.transitionHeroPaint = null
    this.myTween = new TimelineLite()
  }

  componentDidMount() {
    this.anime()
  }

  anime = () => {
    this.myTween
      .to(this.transitionCover, 0.6, {
        y: "-100%",
        delay: 0.6,
        ease: Power1.easeInOut,
      })
      .to(this.transitionHeroPaint, 0.5, {
        opacity: 1,
        delay: -0.2,
        ease: Power1.easeInOut,
      })
      .play()
  }

  render() {
    let homePaintEdges = this.props.data.home.edges
    const posts = homePaintEdges.map(e => e.node)
    return (
      <AppConsumer>
        {context => {
          context.handleLoaderShow(true)
          return (
            <Structure
              data={this.props.data}
              location={this.props.location}
              pageclass="page-home"
            >
              <div
                className="hero-paint"
                ref={n => (this.transitionHeroPaint = n)}
              >
                <Image />
              </div>
              <div
                className={`overlay overlay--loader  ${context.shouldLoaderShow &&
                  "overlay--active"}`}
                ref={n => (this.transitionCover = n)}
              >
                <div className="loader">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </Structure>
          )
        }}
      </AppConsumer>
    )
  }
}

export default HomePage

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
`
