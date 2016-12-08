/* eslint no-undef: 0 */
import React, { Component, PropTypes } from 'react'

export default class Layout extends Component {

  static propTypes = {
    assets: PropTypes.object,
    content: PropTypes.string
  }

  render () {
    const { assets, content } = this.props

    return (
      <html lang='en-us'>
        {undeclaredvariable}
        <head>
          {Object.keys(assets.styles).map((style, key) =>
            <link href={`${assets.styles[style]}`} key={key} rel='stylesheet' type='text/css' charSet='UTF-8' />
          )}
        </head>
        <body>
          <div id='react-root' dangerouslySetInnerHTML={{__html: content}} />
          {Object.keys(assets.scripts).map((script, key) =>
            <script src={assets.scripts[script]} key={key} async />
          )}
        </body>
      </html>
    )
  }
}
