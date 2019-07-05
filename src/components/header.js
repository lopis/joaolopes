import React from 'react'
import { Link } from 'gatsby'
import css from 'styled-components';

const Header = css.div`
  marginBottom: 1.45rem;
  fontSize: 80%;
  display: flex;
  padding: 1.45rem 1.0875rem;
  max-width: 960px;
  margin: 0 auto;
`
const SiteTitle = css(Link)`
  text-decoration: none;
  color: white;
`
const NavLink = css(Link)`
  padding: 1em;
  color: white;
`

const H1 = css.h1`
  margin: 0; 
  flex-grow: 1;
`

export default ({ siteTitle }) => (
  <Header>
    <H1 style={{ margin: 0 }}>
      <SiteTitle to="/">
        {siteTitle}
      </SiteTitle>
    </H1>
    <NavLink to="/about">
      articles
    </NavLink>
    <NavLink to="/about">
      about
    </NavLink>
    <NavLink to="/about">
      resume
    </NavLink>
  </Header>
)
