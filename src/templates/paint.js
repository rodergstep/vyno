import React from "react"
import Grid from "@material-ui/core/Grid"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage, useIntl } from "react-intl"
import Helmet from "react-helmet"
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded"
import Structure from "../components/structure"
import { AppConsumer } from "../utils/context"
import { useCart } from "../utils/cartContext"

const PaintTemplate = props => {
  const intl = useIntl()
  const paint = props.data.contentfulPainting
  const {
    id,
    contentful_id,
    title,
    year,
    image,
    size,
    description,
    method,
    price,
  } = paint
  paint.url = typeof window !== "undefined" && location.pathname

  const [cart, cartApi] = useCart()
  return (
    <Structure>
      <AppConsumer>
        {context => {
          console.log(cart)
          const isAddedToCart =
            cart &&
            Array.isArray(cart) &&
            cart.some(el => el.contentful_id === contentful_id)
          const handlePaintBuy = () => {
            if (isAddedToCart) {
              cartApi(paint, "DELETE")
            } else {
              cartApi(paint, "ADD")
            }
          }
          return (
            <div className="container">
              <Helmet
                title={`${title} | ${intl.formatMessage({
                  id: "authorFullname",
                })}`}
                meta={[
                  {
                    name: "description",
                    content: intl.formatMessage({ id: "seoDescr2" }),
                  },
                  {
                    name: "google-site-verification",
                    content: "v8S_whAsK0Yp1f88Y5zMfcetW_koWN6hxM541_5zve8",
                  },
                ]}
              />
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <div className="figure">
                    {image && <Img fluid={[{ ...image.fluid }]} fadeIn />}
                  </div>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Link
                    to={`/${context.locale}/gallery`}
                    className="backlink d-flex align-center"
                  >
                    <ChevronLeftRoundedIcon />
                    <FormattedMessage id="backlink" />
                  </Link>
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
                  {/* {price && (
                    <div className="paint__price">
                      <span className="mr-2">${price}</span>
                      <button className="btn primary" onClick={handlePaintBuy}>
                        {isAddedToCart ? (
                          <FormattedMessage id="btnRemoveFromCart" />
                        ) : (
                          <FormattedMessage id="btnAddCart" />
                        )}
                      </button>
                    </div>
                  )} */}
                  {description && (
                    <div
                      className="paint__descr"
                      dangerouslySetInnerHTML={{
                        __html: description.childMarkdownRemark.html,
                      }}
                    />
                  )}
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
      contentful_id
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
