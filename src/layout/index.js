import React, { Component } from "react"
import { AppProvider } from "../utils/context"
import Structure from "../components/structure"
import Helmet from "react-helmet"
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n"
import { IntlProvider } from "react-intl"
import "intl"

class Wrapper extends Component {
  constructor(props) {
    super(props)
    const data = this.props.data
    const location = this.props.location
    const url = location.pathname
    const { langs, defaultLangKey } = data.site.siteMetadata.languages
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url)
    this.homeLink = `/${this.langKey}/`
    this.langsMenu = getLangs(
      langs,
      this.langKey,
      getUrlForLang(this.homeLink, url)
    )

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    this.i18nMessages = require(`../data/messages/${this.langKey}`)
    this.contextData = { locale: this.langKey }
  }

  render() {
    return (
      <AppProvider value={this.contextData}>
        <IntlProvider
          locale={this.langKey}
          messages={this.i18nMessages}
          theme="red"
        >
          <Helmet
            title="Viktor Vynogradov"
            meta={[
              { name: "description", content: "Viktor Vynogradov" },
              { name: "keywords", content: "Viktor Vynogradov" },
            ]}
          />
          <Structure langs={this.langsMenu} locale={this.langKey}>
            {this.props.children}
          </Structure>
        </IntlProvider>
      </AppProvider>
    )
  }
}

export default Wrapper
