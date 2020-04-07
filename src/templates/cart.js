import React, { useState } from "react"
import ReactDOMServer from "react-dom/server"
import emailjs from "emailjs-com"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Grid from "@material-ui/core/Grid"
import Structure from "../components/structure"
import OrderForm from "../components/forms/orderForm"
import { FormattedMessage } from "react-intl"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { useCart } from "../utils/cartContext"

const CartPage = props => {
  const [isOrderSentSuccessfully, setOrderSent] = useState(false)
  const [isOrderSentFailed, setOrderSentFailed] = useState(false)

  const cartEdges = props.data.cart.edges
  const [cart, cartApi] = useCart()
  const isCartExist = cart && Array.isArray(cart)
  let totalPrice = 0
  if (isCartExist) {
    totalPrice = cart.reduce(
      (total, obj) => obj.price && +total + +obj.price,
      0
    )
  }
  // componentDidUpdate() {
  //   this.state.isOrderSentSuccessfully && cartApi([], 'RESET')
  // }

  const sendOrder = data => {
    const message_html = ReactDOMServer.renderToStaticMarkup(
      <div>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>назва</th>
              <th>ціна</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((item, i) => (
                <tr key={item.id}>
                  <td>{i}</td>
                  <td>
                    <a href={item.url}>{item.title}</a>
                  </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            <tr>
              <td></td>
              <td></td>
              <td>{totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
    const variables = {
      message_html,
      from_name: data.fullname,
      from_email: data.email,
    }
    emailjs
      .send(
        `${process.env.GATSBY_SERVICE_ID}`,
        `${process.env.GATSBY_TEMPLATE_ID}`,
        variables,
        `${process.env.GATSBY_USER_ID}`
      )
      .then(res => {
        console.log("Email successfully sent!")
        setOrderSent(true)
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
        setOrderSentFailed(true)
      })
  }

  return (
    <Structure>
      <div className="container">
        {cartEdges &&
          cartEdges.map((node, i) => {
            const { title, description } = node.node
            return (
              <div key={i} className="cart-wrap">
                {cart.length > 0 ? (
                  <Grid key={i} container spacing={3}>
                    <Grid item xs={12}>
                      <div className="cart__header">
                        <h2 className="cart__title">{title}</h2>
                        <button
                          className="btn transparent"
                          onClick={() => cartApi([], 'RESET')}
                        >
                          <FormattedMessage id="btnReserCart" />
                        </button>
                      </div>

                      <table className="cart__table">
                        <tbody>
                          {isCartExist &&
                            cart.map((item, i) => (
                              <tr key={item.id}>
                                <td>
                                  <AniLink
                                    fade
                                    to={item.url}
                                    className="cart__item-link"
                                  >
                                    <div className="cart__figure mr-2">
                                      {item.image && (
                                        <Img
                                          fluid={[{ ...item.image.fluid }]}
                                          fadeIn
                                        />
                                      )}
                                    </div>
                                    {item.title}
                                  </AniLink>
                                </td>
                                <td>${item.price}</td>
                              </tr>
                            ))}
                          <tr>
                            <td></td>
                            <td>${totalPrice}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid>
                    <Grid item xs={12}>
                      {isOrderSentSuccessfully ? (
                        description && (
                          <div
                            className="paint__descr"
                            dangerouslySetInnerHTML={{
                              __html: description.childMarkdownRemark.html,
                            }}
                          />
                        )
                      ) : (
                        <OrderForm sendOrder={sendOrder} />
                      )}
                      {isOrderSentFailed && (
                        <div>
                          <p>Щось піщло не так. Спробуйте замовити пізніше.</p>
                          <p>Something gone wrong. Pls, try again</p>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  `Please, click on the button 'Want this masterpiece' to add picture into the cart.
                          Будь ласка, натисніть кнопку "Хочу цей шедевр", щоб додати картину до кошика`
                )}
              </div>
            )
          })}
      </div>
    </Structure>
  )
}

export default CartPage

export const pageQuery = graphql`
  query PageCartQuery($lang: String!) {
    cart: allContentfulPageCart(filter: { node_locale: { eq: $lang } }) {
      edges {
        node {
          contentful_id
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
