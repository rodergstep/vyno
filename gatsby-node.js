const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(
      `
        {
          allContentfulPainting(limit: 1000) {
            edges {
              node {
                id
                contentful_id
                node_locale
                slug
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create Paint pages
        const paintTemplate = path.resolve(`./src/templates/paint.js`)
        // We want to create a detailed page for each
        // paint node. We'll just use the Contentful id for the slug.
        _.each(result.data.allContentfulPainting.edges, edge => {
          // We need a common ID to cycle between locales.
          const commonId = edge.node.slug
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.node_locale}/paints/${commonId}/`,
            component: slash(paintTemplate),
            context: {
              id: edge.node.id,
              contentful_id: edge.node.contentful_id,
            },
          })
        })
      })
      .then(() => {
        graphql(
          `
            {
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
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
          // Create Home page
          const homeTemplate = path.resolve(`./src/templates/home.js`)
          const galleryTemplate = path.resolve(`./src/templates/gallery.js`)
          const aboutTemplate = path.resolve(`./src/templates/about.js`)
          _.each(result.data.site.siteMetadata.languages.langs, lang => {
            createPage({
              path: `/${lang}/`,
              component: slash(homeTemplate),
              context: {
                lang: `${lang}`,
              },
            })
            createPage({
              path: `/${lang}/gallery/`,
              component: slash(galleryTemplate),
              context: {
                lang: `${lang}`,
              },
            })
            createPage({
              path: `/${lang}/about/`,
              component: slash(aboutTemplate),
              context: {
                lang: `${lang}`,
              },
            })
          })

          resolve()
        })
      })
  })
}
