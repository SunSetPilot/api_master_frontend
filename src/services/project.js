import request from '../utils/request';

// get project list
export function queryProjectList() {
  return request(`/api/v1/project`);
}

// get project info
export function queryProjectDetail(params) {
  return request(`/api/v1/project/${params.id}`);
}

export function createProject(params) {
  console.log('params', params)
  return request('/api/v1/project', {
    method: "POST",
    body: {
      ...params,
    },
  })
}

export function updateProject(params) {
  return request(`/api/v1/project/${params.id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  })
}
export function deleteProject(params) {
  return request(`/api/v1/project/${params.id}`, {
    method: "DELETE",
    payload: params
  })
}