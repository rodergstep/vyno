import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query MyQuery {
    allContentfulCategory {
      edges {
        node {
          course {
            description {
              description
            }
            id
            title
            slug
            shortDescription
          }
        }
      }
    }
  }
`
const SecondPage = ({ data }) => (
  <Layout>
    <SEO title="Page two" />

    <p>Welcome to page 2</p>
    {data.allContentfulCategory.edges.map((item, i) => {
      const {
        id,
        title,
        description,
        shortDescription,
        slug,
      } = item.node.course[0]
      return (
        <div key={id}>
          <h3>{title}</h3>
          <h6>{shortDescription}</h6>
          <p>{description.description}</p>
        </div>
      )
    })}
    {console.log(data.allContentfulCategory.edges)}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
