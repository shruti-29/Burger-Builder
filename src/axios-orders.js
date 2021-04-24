import axios from 'axios';

const instance = axios.create({
    baseURL:'https://build-burger-6bab6-default-rtdb.firebaseio.com/'
});

export default instance;