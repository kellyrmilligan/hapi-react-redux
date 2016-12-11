import React, {Component, PropTypes} from 'react'

export default class Layout extends Component {

  static propTypes = {
    assets: PropTypes.object,
    config: PropTypes.object,
    content: PropTypes.string,
    state: PropTypes.string
  }

  render () {
    const { assets, content, state } = this.props
    return (
      <html lang='en-us'>
        <head>
          {Object.keys(assets.styles).map((style, key) =>
            <link href={`${assets.styles[style]}`} key={key} rel='stylesheet' type='text/css' charSet='UTF-8' />
          )}
        </head>
        <body>
          <div id='react-root' dangerouslySetInnerHTML={{__html: content}} />
          <script type='application/json' dangerouslySetInnerHTML={{ __html: `window.__data=${state}` }} charSet='UTF-8' />
          {Object.keys(assets.scripts).map((script, key) =>
            <script src={assets.scripts[script]} key={key} async />
          )}
        </body>
      </html>
    )
  }
}
