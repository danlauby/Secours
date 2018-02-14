import axios from 'axios';


export function createSharedContent(content) {
  return dispatch => {
    return axios.post('/api/content', content);
  };
}
