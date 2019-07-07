import * as React from 'react'
import css from 'styled-components'

const Card = css.div`
  background: white;
  position: relative;
  color: #777;
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -2px rgba(0,0,0,0.12);
  border-radius: 1px;
  margin: 10px;
  border-left: 10px solid #cf546e;
  display: flex;
  flex-direction: column;
  a > & {
    width: 100%;
    top: 0;
    transition: box-shadow 100ms ease-in-out, top 100ms ease-in-out;
  }
  a:hover > & {
    top: -3px;
    box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.1), 0px 6px 8px 0px rgba(0,0,0,0.07), 0px 8px 4px -4px rgba(0,0,0,0.06);
  }
`;

const CardHorizontal = css(Card)`
  padding-right: 200px;
`

const Title = css.h3`
  margin: 30px;
  margin-bottom: 0;
  min-height: 2em;
  line-height: 1em;
`

const Body = css.div`
  flex-grow: 1;
  margin: 30px;
`

const Footer = css.div`
  margin: 30px;
  margin-top: 0;
  text-align: right;
`

const ImageWrapper = css.div`
  overflow: hidden;
  max-height: 150px;
`

const ImageCircleWrapper = css.div`
	overflow: hidden;
	height: 150px;
	width: 150px;
	border-radius: 100px;
	position: absolute;
	right: 0;
	top: 0;
	margin: 1.2em;
`

export default ({ title, footer, image, children }) => {
  return <Card>
    <ImageWrapper>
      {image}
    </ImageWrapper>
    {title && <Title>{title}</Title>}
    <Body>
      {children}
    </Body>
    {footer && <Footer>{footer}</Footer>}
  </Card>
}

const HorizontalCard = ({ title, footer, image, children }) => {
  return <CardHorizontal>
    <ImageCircleWrapper>
      {image}
    </ImageCircleWrapper>
    {title && <Title>{title}</Title>}
    <Body>
      {children}
    </Body>
    {footer && <Footer>{footer}</Footer>}
  </CardHorizontal>
}
export {HorizontalCard}