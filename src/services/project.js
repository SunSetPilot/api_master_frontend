import request from '../utils/request';

// get project list
export function queryProjectList(params) {
  return request(`/api/projects`);
}
// get project info
export function queryProjectDetail(params) {
  return request(`/api/project/${params.id}`);
}

export function createProject(params) {
  return request('/api/project', {
    method: "POST",
    payload: params
  })
}

export function updateProject(params) {
  return request(`/api/project/${params.id}`, {
    method: "PUT",
    payload: params
  })
}