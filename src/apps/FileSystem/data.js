let data = JSON.parse(localStorage.getItem('data')) || {
  items: [
    {
      name: 'fold_a',
      items: [
        {
          name: 'fold_b',
          items: [
            {
              name: 'file3'
            }
          ]
        },
        {
          name: 'file1',
          text: 'dasdfsf'
        },
      ]
    },
    {
      name: 'fold_b',
      items: [
        {
          name: 'file3'
        }
      ]
    },
      {
        name: 'fold_c',
        items: []
      },

  ]
}
let subscribers = []
export const getData = () => data
export const subscribe = (cb) => {
  subscribers.push(cb)
}
export const unsubscribe = (cb) => {
  subscribers = subscribers.filter(item => item == cb)
}
const notify = () => {
  for (let cb of subscribers) {
    cb(data)
  }
  localStorage.setItem('data', JSON.stringify(data))
}
export const getElementByPath = (path) => {
  let target = data
  for( let index of path) {
    target = target.items[index]
  }
  return target
}

export const getTextPath = (path) => {
  let target = data
  let res = '/'
  for(let index of path.slice(0, -1)) {
    target = target.items[index]
    res += target.name + '/'
  }
  return res
}

const recursiveUpdate = (path, cb, node) => {
  const [index, ...restPath] = path
  if (!node) {
    if(path.length){
      data = {
        items: data.items.slice()
      }
      data.items[index] = recursiveUpdate(restPath, cb, data.items[index])
    } else {
      data = cb(data)
    }
    notify()
  } else if (path.length) {
    const newItems = node.items.slice()
    newItems[index] = recursiveUpdate(restPath, cb, node.items[index])
    return {
      ...node,
      items: newItems
    }
  } else {
    return cb(node)
  }
}

const sortCom = (a,b) => {
  if((a.items && b.items) || (!a.items && !b.items)){
    return a.name > b.name ? 1 : -1
  } else if (a.items) {
    return -1
  } else {
    return 1
  }
}


export const create = (path, createData) => {
  return recursiveUpdate(path, (node) => {
    const newItem = {
      name: createData.name,
    }
    if (createData.type === 'folder') {
      newItem.items = []
    } else {
      newItem.text = 'new file....\nplease Edit MEEEEEEE!!!'
    }
    const newItems = node.items.concat(newItem)
    newItems.sort(sortCom)
    return {
      ...node,
      items: newItems
    }

  })
}

export const updateFileText = (path, text) => {
  return recursiveUpdate(path, (node) => {
    return {
      ...node,
      text
    }
  })
}

export const rename = (path, name, cb) => {
  return recursiveUpdate(path.slice(0, -1), (node) => {
    const newItems = node.items.slice()
    const pos = path[path.length - 1]
    newItems[pos] = {
      ...node.items[pos],
      name
    }
    newItems.sort(sortCom)
    cb(newItems.findIndex(item => item.name === name))
    return {
      ...node,
      items: newItems
    }
  })
}

export const del = (path) => {
  return recursiveUpdate(path.slice(0, -1), (node) => {
    const newItems = node.items.slice()
    newItems.splice(path[path.length - 1], 1)
    return {
      ...node,
      items: newItems
    }
  })
}






export default data
