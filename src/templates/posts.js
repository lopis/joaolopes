import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/pages/Post'

export default ({data}) => {
  const { post } = data

  return <Post post={post} />
}

export const query = graphql`
  query Post($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date
        original_source
        original_link
        description
        image {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
        path
      }
      html
    }
  }
`
