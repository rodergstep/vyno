import React, { Component } from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Header from "./Header";
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
    this.children = this.props.children;
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
            title="Gatsby Default Starter"
            meta={[
              { name: "description", content: "Sample" },
              { name: "keywords", content: "sample, something" }
            ]}
          />
          <Header langs={this.langsMenu} />
          <div>
            <Link to="/">
              <h3 style={{ color: `tomato`, marginBottom: rhythm(1.5) }}>
                Example of using Contentful as a data source for a Gatsby site
              </h3>
            </Link>
            {this.children}
            <hr style={{ marginTop: rhythm(3) }} />
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default TemplateWrapper;
