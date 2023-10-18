import request from '../utils/request';

// get project list
export function queryProjectList(params) {
  return request(`https://www.fastmock.site/mock/68b641f3070593e1c00cd9f71b8e82fc/api/projects`);
}
// get project info
export function queryProjectDetail(params) {
  return request(`/project/${params.id}`);
}
