let data = {
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

export const create = (path, createData, node) => {
  const [index, ...restPath] = path
  if (!node) {
    data = {
      items: data.items.slice()
    }
    data.items[index] = create(restPath, createData, data.items[index])
    notify()
  } else if (path.length) {
    const newItems = node.items.slice()
    newItems[index] = create(restPath, createData, node.items[index])
    return {
      ...node,
      items: newItems
    }
  } else {
    const newItem = {
      name: createData.name,
    }
    if (createData.type === 'folder') {
      newItem.items = []
    } else {
      newItem.text = 'new file....\nplease Edit MEEEEEEE!!!'
    }
    const newItems = node.items.concat(newItem)
    newItems.sort((a,b) => {
      if((a.items && b.items) || (!a.items && !b.items)){
        return a.name > b.name ? 1 : -1
      } else if (a.items) {
        return -1
      } else {
        return 1
      }
    })
    return {
      ...node,
      items: newItems
    }
  }
}
export default data
