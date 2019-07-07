import React from 'react'
import { graphql } from 'gatsby'

import Career from '../components/pages/Career'

export default ({ data }) => {
  const { post } = data

  return <Career post={post} />
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
