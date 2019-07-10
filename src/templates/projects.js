import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import css from 'styled-components'

import Layout from '../components/layout/Layout'
import Card from '../components/layout/Card'

export default ({ data }) => {
  const { post } = data

  const ImageWrapper = css.div`
    overflow: hidden;
    max-height: 300px;
    margin: -30px -30px 30px;
  `

  return (
    <Layout>
      <Card maxWidth="960">
        <ImageWrapper>
          {post.image && <Img fluid={post.image.childImageSharp.fluid} />}
        </ImageWrapper>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Card>
    </Layout>
  )
}

export const query = graphql`
  query Project($path: String!) {
    project: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        date
        repository
        websites
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
