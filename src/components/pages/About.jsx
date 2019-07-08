import * as React from 'react'
import css from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../layout/Layout'
import Card from '../layout/Card'
import './markdown.css'

const ImageWrapper = css.div`
overflow: hidden;
max-height: 300px;
margin: -30px -30px 30px;
& img {
  margin-top: -25%;
}
@media(max-width: 550px) {
  max-height: 150px;
}
`

const Container = css.div`
max-width: 960px;
margin: auto;
`

const About = ({post}) => {
  return (
    <Layout>
      <Container>
        <Card>
          <ImageWrapper>
            {post.frontmatter.image && <Img fluid={post.frontmatter.image.childImageSharp.fluid} />}
          </ImageWrapper>
          <h1>{post.frontmatter.title}</h1>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Card>
      </Container>
    </Layout>
  )
}

export default About