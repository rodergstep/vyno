import React from "react"
import { injectIntl } from "react-intl"
import Helmet from "react-helmet"
import { graphql, navigate, withPrefix } from "gatsby"
import { getUserLangKey } from "ptz-i18n"

class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args)

    // Skip build, Browsers only
    if (typeof window !== "undefined") {
      const { langs, defaultLangKey } = args.data.site.siteMetadata.languages
      const langKey = getUserLangKey(langs, defaultLangKey)
      const homeUrl = withPrefix(`/${langKey}/`)

      navigate(homeUrl)
    }
  }

  render() {
    // It's recommended to add your SEO solution in here for bots
    // eg. https://github.com/ahimsayogajp/ahimsayoga-gatsby/blob/master/src/pages/index.js#L22
    return (
      <div>
        <Helmet
          title={this.props.intl.formatMessage({ id: "authorFullname" })}
          meta={[
            {
              name: "description",
              content: this.props.intl.formatMessage({ id: "seoDescr" }),
            },
            {
              name: "google-site-verification",
              content: "v8S_whAsK0Yp1f88Y5zMfcetW_koWN6hxM541_5zve8",
            },
          ]}
        />
      </div>
    )
  }
}

export default injectIntl(RedirectIndex)

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`
