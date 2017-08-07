import React, { PureComponent } from 'react'
import style from './FS.css'
import { getElementByPath, create, getTextPath, del, rename, updateFileText } from './data'

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
  onDel = () => {
    del(this.props.path)
    this.props.onClose && this.props.onClose()
  }

  onRename = () => {
    rename(this.props.path, this.state.newName, this.props.updateLastPath)
    this.setState({ newName: undefined })
  }
  onSaveText = () => {
    updateFileText(this.props.path, this.state.newText)
     this.setState({ newText: undefined })
  }
  onNameChange = (event) => this.setState({ newName: event.target.value})

  onNameText = (event) => this.setState({ newText: event.target.value})

  render () {
    const { path } = this.props
    const { createData, newName, newText } = this.state
    const element = getElementByPath(path)
    const textPath = getTextPath(path)
    const isFolder = !!element.items
    return (
      <div className='contentLayer'>
        <div>
          {textPath}<input className='nameEdit' value={ newName == undefined ? element.name : newName}  onChange={this.onNameChange} />&nbsp;&nbsp;
          { newName && <button onClick={this.onRename}>update Name</button> }&nbsp;&nbsp;
          <button onClick={this.onDel}>delete</button>
        </div>
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
                    {createData.type} name:&nbsp;&nbsp;
                    <input autoFocus value={createData.name} onChange={this.onCreateChange} />&nbsp;&nbsp;
                    {
                      (createData.name && createData.name.trim().length) && (
                        <button onClick={() => this.onEndCreate('folder')}>done</button>
                      )
                    }
                  </div>
                )
              }
            </div>
          )
          :(
            <div>
              <div>
                <textarea rows="10" cols="45" value={newText == undefined ? element.text : newText} onChange={this.onNameText} />
              </div>
              {newText && <button onClick={this.onSaveText} >Save file</button> }
            </div>
          )
        }
       </div>
    )
  }
}

export default Content
