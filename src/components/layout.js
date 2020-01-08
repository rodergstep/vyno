import React, { Component } from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Structure from "./structure";
import Helmet from "react-helmet";
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n";
import { IntlProvider, addLocaleData } from "react-intl";
import { rhythm } from "../utils/typography";
import "intl";

import en from "react-intl/locale-data/en";
import "intl/locale-data/jsonp/en";
import uk from "react-intl/locale-data/uk";
import "intl/locale-data/jsonp/uk";

// add concatenated locale data
addLocaleData([...en, ...uk]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(
      langs,
      this.langKey,
      getUrlForLang(this.homeLink, url)
    );

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    this.i18nMessages = require(`../data/messages/${this.langKey}`);
  }
  render() {
    return (
      <IntlProvider locale={this.langKey} messages={this.i18nMessages}>
        <div>
          <Helmet
            title="Viktor Vynogradov"
            meta={[
              { name: "description", content: "Viktor Vynogradov" },
              { name: "keywords", content: "Viktor Vynogradov" }
            ]}
          />
          <Structure langs={this.langsMenu}>{this.props.children}</Structure>
        </div>
      </IntlProvider>
    );
  }
}

export default TemplateWrapper;
