import React, { PureComponent } from 'react'
import style from './FS.css'
console.log(style)

class Node extends PureComponent {
  state = {
    isCollapsed: true,
  }

  onToggle () {
    this.setState({ isCollapsed: !this.state.isCollapsed})
  }

  onOpen = (path = []) => {
    if(this.props.isRoot) {
      this.props.onOpen(path)
    } else {
      this.props.onOpen([this.props.index, ...path])
    }
  }

  render () {
    const { name, isRoot, index, items } = this.props
    const { isCollapsed  } = this.state
    const isFolder = !!items
    return (
      <div className=''>
        {!isRoot && (
          <div className='title'>
            {isFolder && (
              <div className='colapse' onClick={() => this.onToggle()}>{isCollapsed ? '+' : '-' }</div>
            )}
            <div className={isFolder ? 'folder' : 'file'} onClick={() => this.onOpen()}> {name} </div>
          </div>)
        }
        {isFolder && (!isCollapsed || isRoot) ? (<div className={isRoot ? '' : 'childrens' }>
            {items.length
              ? items.map((item, index) =>
                 <Node key={index} index={index} onOpen={this.onOpen} {...item} />
               )
             : <div className='noItems'>empty...</div> }
          </div>)
          :null
        }
       </div>
    )
  }
}

export default Node
