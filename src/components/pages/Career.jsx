import * as React from 'react'
import Layout from '../layout/Layout'

const Career = ({post}) => {
  return (
    <Layout>
      <div>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  )
}

export default Career