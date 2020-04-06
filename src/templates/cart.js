import React from "react"
import ReactDOMServer from "react-dom/server"
import emailjs from "emailjs-com"
import { getCart } from "../utils/cart.service"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Grid from "@material-ui/core/Grid"
import Structure from "../components/structure"
import { AppConsumer } from "../utils/context"
import OrderForm from "../components/forms/orderForm"
import { FormattedMessage } from "react-intl"
import AniLink from "gatsby-plugin-transition-link/AniLink"

class CartPage extends React.Component {
  constructor() {
    super()
    this.state = {
      cartEdges: [],
      items: [],
      totalPrice: 0,
      isOrderSentSuccessfully: false,
      isOrderSentFailed: false,
    }
  }
  componentDidMount() {
    const cartEdges = this.props.data.cart.edges
    const items = getCart() || []
    let totalPrice = 0
    if (items && items.length > 0) {
      totalPrice = items.reduce(
        (total, obj) => obj.price && +total + +obj.price,
        0
      )
    }
    this.setState({ cartEdges, items, totalPrice })
  }

  sendOrder = data => {
    const { items, totalPrice } = this.state
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
            {items &&
              items.map((item, i) => (
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
        this.setState({ isOrderSentSuccessfully: true })
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
        this.setState({ isOrderSentFailed: true })
      })
  }

  render() {
    return (
      <AppConsumer>
        {context => {
          this.state.isOrderSentSuccessfully && context.cartApi.resetCart()

          return (
            <Structure>
              <div className="container">
                {this.state.cartEdges &&
                  this.state.cartEdges.map((node, i) => {
                    const { items, totalPrice } = this.state
                    const { title, description } = node.node
                    return (
                      <div className="cart-wrap">
                        {items.length > 0 ? (
                          <Grid key={i} container spacing={3}>
                            <Grid item xs={12}>
                              <div className="cart__header">
                                <h2 className="cart__title">{title}</h2>
                                <button
                                  className="btn transparent"
                                  onClick={() => context.cartApi.resetCart()}
                                >
                                  <FormattedMessage id="btnReserCart" />
                                </button>
                              </div>

                              <table className="cart__table">
                                <tbody>
                                  {items &&
                                    items.map((item, i) => (
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
                                                  fluid={[
                                                    { ...item.image.fluid },
                                                  ]}
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
                              {this.state.isOrderSentSuccessfully ? (
                                description && (
                                  <div
                                    className="paint__descr"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        description.childMarkdownRemark.html,
                                    }}
                                  />
                                )
                              ) : (
                                <OrderForm sendOrder={this.sendOrder} />
                              )}
                              {this.state.isOrderSentFailed && (
                                <div>
                                  <p>
                                    Щось піщло не так. Спробуйте замовити
                                    пізніше.
                                  </p>
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
        }}
      </AppConsumer>
    )
  }
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
