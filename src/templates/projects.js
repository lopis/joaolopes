import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/pages/Post'

export default ({ data }) => {
  const { post } = data

  return <Post post={post} />
}

export const query = graphql`
  query Project($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        date
        repository
        website
        description
        status
        image {
          childImageSharp {
            original {
              width
              height
            }
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
          absolutePath
        }
      }
      html
    }
  }
`
