import axios from 'axios';


export const createSharedContent = (content) => {
  return dispatch => {
    return axios.post('/api/content', content);
  };
}
