import * as React from 'react'
import css from 'styled-components'

import githubIcon from '../../../assets/icon/github.svg'
import twitterIcon from '../../../assets/icon/twitter.svg'
import downloadIcon from '../../../assets/icon/download.svg'
import globeIcon from '../../../assets/icon/globe.svg'

const icons = {
  github: githubIcon,
  twitter: twitterIcon,
  resume: downloadIcon,
  website: globeIcon,
}
const Img = css.img`
  height: 40px;
  widht: 40px;
  margin: 0 10px;
`
export default ({link, type}) => {
  return <a href={link} target="_blank" rel="noopener noreferrer">
    <Img src={icons[type]} alt={type}/>
  </a>
}