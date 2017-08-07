import React, { PureComponent } from 'react'
import style from './FS.css'
import { getData, subscribe, unsubscribe } from './data'
import Node from './Node'
import Content from './Content'

class FS extends PureComponent {
  state = {}
  componentWillMount() {
    this.setState({
      items: getData().items
    })
    subscribe(this.onDataChange)
  }
  componentWillUnmount() {
    unsubscribe(this.onDataChange)
  }
  onDataChange = (data) => {
    this.setState({
      items: data.items
    })
  }
  onOpen = (path) => {
    this.setState({
      openPath: path
    })
  }

  onCloseFile = () => {
    this.setState({
      openPath: undefined
    })
  }

  render () {
    const { openPath, items } = this.state
    return (
      <div className='fsRoot'>
        <div className='fsNav'>
          <Node isRoot items={items} onOpen={this.onOpen} />
        </div>
        <div className='fsContent'>
          {openPath
            ? <Content path={openPath} onClose={this.onCloseFile} />
            : <div> please select some...</div>}
        </div>
       </div>
    )
  }
}

export default FS
