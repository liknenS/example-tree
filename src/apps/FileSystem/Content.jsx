import React, { PureComponent } from 'react'
import style from './FS.css'
import { getElementByPath, create, getTextPath } from './data'

class Content extends PureComponent {
  state = {
    createData: null
  }
  onStartCreate = (type) => {
    this.setState({
      createData: {
        type
      }
    })
  }
  onEndCreate = (type) => {
    const { path } = this.props
    create(path, this.state.createData)
    this.setState({
      createData: null
    })
  }
  onCreateChange = (event) => {
    this.setState({
      createData: {
        ...this.state.createData,
        name: event.target.value
      }
    })
  }

  render () {
    const { path } = this.props
    const { createData } = this.state
    const element = getElementByPath(path)
    const textPath = getTextPath(path)
    const isFolder = !!element.items
    return (
      <div className='contentLayer'>
        <div>{textPath}<input className='nameEdit' value={element.name} /></div>
        {
          isFolder
          ? (
            <div>
              <div>
                <button onClick={() => this.onStartCreate('file')}>create file</button>&nbsp;&nbsp;
                <button onClick={() => this.onStartCreate('folder')}>create folder</button>
              </div>
              {
                createData && (
                  <div className='createForm'>
                    name:&nbsp;&nbsp;
                    <input value={createData.name} onChange={this.onCreateChange} />&nbsp;&nbsp;
                    <button onClick={() => this.onEndCreate('folder')}>done</button>
                  </div>
                )
              }
            </div>
          )
          :(
            <div>
              <div>
                <textarea rows="10" cols="45" value={element.text}> </textarea>
                </div>
              <button >Save file</button>
            </div>
          )
        }
       </div>
    )
  }
}

export default Content
