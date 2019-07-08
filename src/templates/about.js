import React from 'react'
import { graphql } from 'gatsby'
import About from '../components/pages/About'

export default ({data}) => {
  const { post } = data

  return <About post={post} />
}

export const query = graphql`
  query About($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        github
        linkedin
        twitter
        bio
        image {
          childImageSharp {
            fluid(maxWidth: 900, maxHeight: 900) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`
