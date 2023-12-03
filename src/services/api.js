import request from '../utils/request';

// get API list
export function queryAPIList(params) {
  console.log(params)
  return request(`/api/v1/api/project/${params.id}`);
}
// get API info
export function queryAPIDetail(params) {
  return request(`/api/v1/api/${params.id}`);
}

export function createAPI(params) {
  return request('/api/v1/api', {
    method: "POST",
    body: {
      ...params,
    },
  })
}

export function updateAPI(params) {
  return request(`/api/v1/api/${params.id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  })
}

export function deleteAPI(params) {
  return request(`/api/v1/api/${params.id}`, {
    method: "DELETE",
    payload: params
  })
}

export function batchImportAPI(params) {
  return request(`/api/v1/api/import`, {
    method: "POST",
    body: {
      ...params,
    },
  })
}