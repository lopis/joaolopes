import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import './layout.css'

const Layout = ({ children }) => (
  <div>
    <Header siteTitle="jlopes.dev" />
    <div
      style={{
        margin: '0 auto',
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
    <footer>
      <p>
      &copy; Joao Lopes 2019
      </p>
    </footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
