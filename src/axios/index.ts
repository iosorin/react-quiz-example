import axios from 'axios';

const config = {
    baseURL: 'https://react-quiz-8d50b.firebaseio.com/',
};

/* todo: fix any */
const api: any = axios.create(config);

export default api;
