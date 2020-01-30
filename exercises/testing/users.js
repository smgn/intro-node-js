const users = new Array(20).fill(0)
.map((_, i) => {
  return {
    id: i,
    createdAt: Date.now() + i,
    email: `readycoder${i}@gmail.com`
  }
})

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
  if( typeof(id) !== 'number'){
    return reject(new Error(`Invalid type of id: ${typeof(id)}`))
  }
  const user = users.find(user => user.id === id)
  if (user) {
    return resolve(user)
  } else
  reject(new Error(`No user with id "${id}"`))
})

// simulate async db call with promise
const deleteUser = (id) => new Promise((resolve, reject) => {
  if( typeof(id) !== 'number'){
    return reject(new Error(`Invalid type of id: ${typeof(id)}`))
  }
  const i = users.findIndex(user => user.id === id)

  if (i < 0) {
    return reject(new Error(`No user with id "${id}"`))
  }

  const removed = users.splice(i, 1)
  resolve(removed)
})

module.exports = {
  findUser,
  deleteUser
}
