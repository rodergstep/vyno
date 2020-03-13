import React from "react"
import ReactDOMServer from "react-dom/server"
import emailjs from "emailjs-com"
// import { getCart } from "../utils/cart.service"

import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Img from "gatsby-image"
import { FormattedMessage, useIntl } from "react-intl"
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded"
import Structure from "../components/structure"
import { AppConsumer } from "../utils/context"

const PaintTemplate = props => {
  const paint = props.data.contentfulPainting
  const { id, title, year, image, size, description, method, price } = paint

  // const items = getCart()
  // const totalPrice = items.reduce(
  //   (total, obj) => obj.price && +total + +obj.price,
  //   0
  // )
  // const message_html = ReactDOMServer.renderToStaticMarkup(
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>№</th>
  //         <th>назва</th>
  //         <th>ціна</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {items.map((item, i) => (
  //         <tr key={item.id}>
  //           <td>{i}</td>
  //           <td>{item.title}</td>
  //           <td>{item.price}</td>
  //         </tr>
  //       ))}
  //       <tr>
  //         <td></td>
  //         <td></td>
  //         <td>{totalPrice}</td>
  //       </tr>
  //     </tbody>
  //   </table>
  // )
  // const variables = {
  //   message_html,
  //   from_name: "Romau",
  // }
  const sendOrder = () => {
    emailjs
      .send(GATSBY_SERVICE_ID, GATSBY_TEMPLATE_ID, variables, GATSBY_USER_ID)
      .then(res => {
        console.log("Email successfully sent!")
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      )
  }

  return (
    <Structure>
      <AppConsumer>
        {context => {
          return (
            <div className="container">
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <div className="figure">
                    {image && <Img fluid={[{ ...image.fluid }]} fadeIn />}
                  </div>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <AniLink
                    fade
                    to={`/${context.locale}/gallery`}
                    className="backlink d-flex align-center"
                  >
                    <ChevronLeftRoundedIcon />
                    <FormattedMessage id="backlink" />
                  </AniLink>
                  <h1 className="paint__title">{title}</h1>
                  <div className="paint__info">
                    {size && (
                      <span>
                        <FormattedMessage id="paintSize" />: {size}
                      </span>
                    )}
                    {method && (
                      <span>
                        <FormattedMessage id="paintMethod" />: {method}
                      </span>
                    )}
                    {year && (
                      <span>
                        <FormattedMessage id="paintYear" />: {year}
                      </span>
                    )}
                  </div>
                  {price && (
                    <div className="paint__price">
                      <div>${price}</div>
                      {/* <button
                        className="btn secondary"
                        // disabled={true}
                        onClick={() =>
                          context.cartApi.addToCart({ id, price, title })
                        }
                      >
                        <FormattedMessage id="buyBtn" />
                      </button>
                      <button
                        className="btn secondary"
                        onClick={() => context.cartApi.resetCart()}
                      >
                        remove all
                      </button>
                      <button
                        className="btn secondary"
                        onClick={() => context.cartApi.removeFromCart({ id })}
                      >
                        remove one
                      </button> */}
                    </div>
                  )}
                  {description && (
                    <div
                      className="paint__descr"
                      dangerouslySetInnerHTML={{
                        __html: description.childMarkdownRemark.html,
                      }}
                    />
                  )}
                  {/* <button
                    onClick={sendOrder}
                    style={{
                      position: "fixed",
                      top: 30,
                      right: 30,
                      zIndex: 10,
                    }}
                  >
                    send
                  </button> */}
                </Grid>
              </Grid>
            </div>
          )
        }}
      </AppConsumer>
    </Structure>
  )
}

export default PaintTemplate

export const pageQuery = graphql`
  query paintQuery($id: String!) {
    contentfulPainting(id: { eq: $id }) {
      id
      title
      year
      updatedAt(formatString: "")
      size
      price
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        contentful_id
        title
        fluid(maxWidth: 1000, quality: 70) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
