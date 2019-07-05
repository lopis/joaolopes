import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

export default ({ data }) => {
  const { post, img } = data
  const { pages, languages, ...attributes } = post

  return (
    <Layout>
      <div>
        <div>
          <h1>{post.frontmatter.title}</h1>
          {Object.keys(attributes).map(key => {
            <div>{attributes[key]}</div>
          })}
          {img && <Img fluid={img.childImageSharp.fluid} />}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AboutSection($path: String!, $image: String) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        name
        birth_date
        nationality
        location
        pages {
          github
          codepen
          dev_to
        }
        languages
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
