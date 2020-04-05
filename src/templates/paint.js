import React from "react"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded"
import Structure from "../components/structure"
import { AppConsumer } from "../utils/context"

const PaintTemplate = props => {
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
  paint.url = (typeof window !== 'undefined') && location.pathname

  return (
    <Structure>
      <AppConsumer>
        {context => {
          const { removeFromCart, addToCart, viewCart } = context.cartApi
          const isAddedToCart = viewCart() && viewCart().some(
            el => el.contentful_id === contentful_id
          )
          const handlePaintBuy = () => {
            if (isAddedToCart) {
              removeFromCart(paint)
            } else {
              addToCart(paint)
            }
          }
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
                      <span className="mr-2">${price}</span>
                      <button className="btn primary" onClick={handlePaintBuy}>
                        {isAddedToCart ? (
                          <FormattedMessage id="btnRemoveFromCart" />
                        ) : (
                          <FormattedMessage id="btnAddCart" />
                        )}
                      </button>
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
