import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://appomer.firebaseio.com/'
});

export default instance;