import * as React from 'react'
import css from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../layout/Layout'
import Card from '../layout/Card'
import './markdown.css'
import SocialIcon from '../img/SocialIcon';

const ImageWrapper = css.div`
overflow: hidden;
max-height: 300px;
margin: -30px -30px 30px;
`

const Container = css.div`
max-width: 960px;
margin: auto;
`

const ProjectLinksContainer = css.div`
float: right;
@media(max-width: 768px) {
  float: none;
  margin: 30px -10px 15px;
}
`

const Post = ({post}) => {
  return (
    <Layout>
      <Container>
        <Card>

          <ImageWrapper>
            {post.frontmatter.image && <Img fluid={post.frontmatter.image.childImageSharp.fluid} />}
          </ImageWrapper>
          <ProjectLinksContainer>
            {post.frontmatter.repository && <SocialIcon link={post.frontmatter.repository} type="github" />}
            {post.frontmatter.website && <SocialIcon link={post.frontmatter.website} type="website" />}
          </ProjectLinksContainer>
          <h1>{post.frontmatter.title}</h1>
          <p>
            <em>
            Originally posted to <a href={post.frontmatter.original_link}>{post.frontmatter.original_source}</a>
            </em>
          </p>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Card>
      </Container>
    </Layout>
  )
}

export default Post