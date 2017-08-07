import React, { PureComponent } from 'react'
import style from './FS.css'
console.log(style)

class Node extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: true,
      items: props.items ? this.sortItems(props.items) : null
    }
  }
  state = {
    isCollapsed: true
  }

  onToggle () {
    this.setState({ isCollapsed: !this.state.isCollapsed})
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items ? this.sortItems(nextProps.items) : null
    })
  }

  sortItems (items) {
    const newIetms = items.slice()
    newIetms.sort((a,b) => {
      if((a.items && b.items) || (!a.items && !b.items)){
        return a.name > b.name ? 1 : -1
      } else if (a.items) {
        return -1
      } else {
        return 1
      }
    })
    return newIetms
  }

  render () {
    const { name, isRoot = 0 } = this.props
    const { isCollapsed, items } = this.state
    const isFolder = !!items
    return (
      <div className=''>
        {!isRoot && (<div className='title' onClick={() => this.onToggle()}>
            {isFolder && <div className='colapse'>{isCollapsed ? '+' : '-' }</div>}
            <div className={isFolder ? 'folder' : 'file'}> {name} </div>
          </div>)
        }
        {isFolder && (!isCollapsed || isRoot) ? (<div className={isRoot ? '' : 'childrens' }>
            {items.length ? items.map((item, index) => ( <Node key={index} {...item} />)) : <div className='noItems'>empty...</div> }
          </div>)
          :null
        }
       </div>
    )
  }
}

export default Node
