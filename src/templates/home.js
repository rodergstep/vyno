import React from "react"
import { graphql } from "gatsby"
import { TweenLite, TimelineLite, Power1 } from "gsap"
import { AppConsumer } from "../utils/context"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import Structure from "../components/structure"
import Tilt from "../components/tilt"

class HomePage extends React.Component {
  constructor() {
    super()

    this.state = {
      pageclass: "page-home",
    }

    this.transitionCover = null
    this.transitionTitle = null
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
      .to(this.transitionTitle, 0.3, {
        y: "-5vw",
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
              <Tilt>
                <div className="room room--current">
                  <div className="room__side room__side--back">
                    <Img
                      fluid={[{ ...posts[0].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                    <Img
                      fluid={[{ ...posts[1].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                  </div>
                  <div className="room__side room__side--left">
                    <Img
                      fluid={[{ ...posts[2].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                    <Img
                      fluid={[{ ...posts[3].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                    <Img
                      fluid={[{ ...posts[4].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                  </div>
                  <div className="room__side room__side--right">
                    <Img
                      fluid={[{ ...posts[5].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                    <Img
                      fluid={[{ ...posts[6].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                    <Img
                      fluid={[{ ...posts[7].image.fluid }]}
                      fadeIn
                      className="room__img"
                    />
                  </div>
                  <div className="room__side room__side--bottom"></div>
                </div>
              </Tilt>
              <h1 className="hero__title" ref={n => (this.transitionTitle = n)}>
                <FormattedMessage id="authorName" />
                <br />
                <FormattedMessage id="authorSurame" />
              </h1>
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
