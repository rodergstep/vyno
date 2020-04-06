require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const languages = require("./src/data/languages")
module.exports = {
  siteMetadata: {
    title: `Vynogradov Victor`,
    description: `Vynogradov Victor - the famous artist in the world`,
    author: `@rodergstep`,
    languages,
  },
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "any",
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ttaqr9qdpu1k`,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Viktor Vynogradov`,
        short_name: `Vynogradov`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/wine-icon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Assistant`,
            variants: [`300`, `400`, `700`],
            subsets: [`latin`, `cyrillic`],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/layout`),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
