import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import css from 'styled-components'

import Layout from '../components/layout'
import Card from '../components/Card';

export default ({data}) => {
  const { post, img } = data

  const ImageWrapper = css.div`
    overflow: hidden;
    max-height: 300px;
    margin: -30px -30px 30px;
  `

  return (
    <Layout>
      <Card maxWidth="960">
        <ImageWrapper>
          {img && <Img fluid={img.childImageSharp.fluid} />}
        </ImageWrapper>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Card>
    </Layout>
  )
}

export const query = graphql`
  query Post($path: String!, $image: String) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date
        original_source
        original_link
        description
        image
        tags
        path
      }
      html
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
