import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n"
import { IntlProvider } from "react-intl"
import "intl"
import { AppProvider } from "../utils/context"
import { CartProvider } from '../utils/cartContext';


export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            languages {
              defaultLangKey
              langs
            }
          }
        }
        navData: allContentfulPageHome {
          edges {
            node {
              node_locale
              author_name
              avatar {
                contentful_id
                fluid(maxWidth: 400, quality: 70) {
                  ...GatsbyContentfulFluid
                }
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      const [shouldLoaderShow, handleLoaderShow] = useState(false)
      const location = props.location
      const url = location.pathname
      const { langs, defaultLangKey } = data.site.siteMetadata.languages
      const langKey = getCurrentLangKey(langs, defaultLangKey, url)
      const homeLink = `/${langKey}/`
      const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))
      const aside = data.navData.edges.filter(
        i => i.node.node_locale === langKey
      )[0].node
      // get the appropriate message file based on langKey
      // at the moment this assumes that langKey will provide us
      // with the appropriate language code
      const i18nMessages = require(`../data/messages/${langKey}`)
      const contextData = {
        locale: langKey,
        langsMenu: langsMenu,
        aside,
        shouldLoaderShow: shouldLoaderShow,
        handleLoaderShow: e => handleLoaderShow(e),
      }
      return (
        <AppProvider value={contextData}>
          <CartProvider>
          <IntlProvider locale={langKey} messages={i18nMessages}>
            {props.children}
          </IntlProvider>
          </CartProvider> 
        </AppProvider>
      )
    }}
  />
)
