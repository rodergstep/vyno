import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import { AppProvider } from "../utils/context"
import Structure from "../components/structure"
import Helmet from "react-helmet"
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n"
import { IntlProvider } from "react-intl"
import "intl"

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
      }
    `}
    render={data => {
      console.log(data)
      const location = props.location
      const url = location.pathname
      const { langs, defaultLangKey } = data.site.siteMetadata.languages
      const langKey = getCurrentLangKey(langs, defaultLangKey, url)
      const homeLink = `/${langKey}/`
      const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))

      // get the appropriate message file based on langKey
      // at the moment this assumes that langKey will provide us
      // with the appropriate language code
      const i18nMessages = require(`../data/messages/${langKey}`)
      const contextData = { locale: langKey }
      return (
        <AppProvider value={contextData}>
          <IntlProvider locale={langKey} messages={i18nMessages} theme="red">
            <Helmet
              title="Viktor Vynogradov"
              meta={[
                { name: "description", content: "Viktor Vynogradov" },
                { name: "keywords", content: "Viktor Vynogradov" },
              ]}
            />
            <Structure langs={langsMenu} locale={langKey}>
              {props.children}
            </Structure>
          </IntlProvider>
        </AppProvider>
      )
    }}
  />
)
