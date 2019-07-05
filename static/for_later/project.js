import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

export default ({ data }) => {
  const { post, img } = data
  return (
    <Layout>
      <div>
        <div>
          <h1>{post.frontmatter.title}</h1>
          {img && <Img fluid={img.childImageSharp.fluid} />}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Project($path: String!, $image: String) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
    img: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: $image }
    ) {
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
`
