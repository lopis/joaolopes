import * as React from 'react'
import css from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../layout/Layout'
import Card from '../layout/Card'

const ImageWrapper = css.div`
overflow: hidden;
max-height: 300px;
margin: -30px -30px 30px;
`

const Container = css.div`
max-width: 960px;
margin: auto;
`

const Post = ({post}) => {
  return (
    <Layout>
      <Container>
        <Card>
          <ImageWrapper>
            {post.image && <Img fluid={post.image.childImageSharp.fluid} />}
          </ImageWrapper>
          <h1>{post.frontmatter.title}</h1>
          <div>
            <a href={post.original_link}>{post.original_source}</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Card>
      </Container>
    </Layout>
  )
}

export default Post