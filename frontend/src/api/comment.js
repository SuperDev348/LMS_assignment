import { apiDelete, apiGet, apiPost, apiPut } from './index'


async function update(data) {
  try {
    await apiPut(`/api/comment/${data._id}`, data)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await apiDelete(`/api/comment/${id}`)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await apiGet(`/api/comment/${id}`)
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll(studentId, levelId) {
  try {
    let comments = await apiPost(`/api/comment/filter`, {
      userID: studentId,
      levelID: levelId
    })
    comments.sort((a, b) => {
      let comparison = 0;
      if (a._id > b._id) {
        comparison = 1;
      } else if (a._id < b._id) {
        comparison = -1;
      }
      return comparison;
    })
    return Promise.resolve(comments)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getByPagination(studentId, levelId, row, from) {
  try {
    let comments = await apiPost(`/api/comment/filter`, {
      userID: studentId,
      levelID: levelId,
    });
    comments.sort((a, b) => {
      let comparison = 0;
      if (a._id > b._id) {
        comparison = 1;
      } else if (a._id < b._id) {
        comparison = -1;
      }
      return comparison;
    });
    return Promise.resolve(comments)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  remove,
  get,
  getAll,
  getByPagination,
}