import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const { post } = data
  return (
    <Layout>
      <div>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Career($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        org
        website
        location
        date
        period
      }
      html
    }
  }
`
