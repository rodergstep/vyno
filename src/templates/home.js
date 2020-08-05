import React from "react"
import { graphql } from "gatsby"
import { TimelineLite, Power1 } from "gsap"
import { injectIntl } from "react-intl"
import Helmet from "react-helmet"
import { AppConsumer } from "../utils/context"
import Img from "gatsby-image"
import Structure from "../components/structure"

class HomePage extends React.Component {
  constructor(props) {
    super(props)

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
    let homeDataEdges = this.props.data.home.edges
    const homeData = homeDataEdges.map(e => e.node)
    const { heroPaint } = homeData[0]
    return (
      <AppConsumer>
        {context => {
          // context.handleLoaderShow(true)
          return (
            <Structure pageclass="page-home">
              <Helmet
              title={this.props.intl.formatMessage({id: 'authorFullname'})}
              meta={[
                {
                  name: "description",
                  content: this.props.intl.formatMessage({ id: "seoDescr" }),
                },
              ]}
              />
              <div
                className="hero-paint"
                ref={n => (this.transitionHeroPaint = n)}
              >
                {heroPaint && <Img fluid={[{ ...heroPaint.fluid }]} fadeIn />}
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

export default injectIntl(HomePage)

export const pageQuery = graphql`
  query PageHomeQuery($lang: String!) {
    home: allContentfulPageHome(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          heroPaint {
            contentful_id
            fluid(maxWidth: 1600, quality: 70) {
              ...GatsbyContentfulFluid
            }
            title
          }
        }
      }
    }
  }
`
