import * as React from 'react'
import Layout from '../layout/Layout'
import Card from '../layout/Card'
import css from 'styled-components'

const Container = css.div`
max-width: 960px;
margin: auto;
`

const Career = ({post}) => {
  return (
    <Layout>
      <Container>
        <Card>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Card>
      </Container>
    </Layout>
  )
}

export default Career