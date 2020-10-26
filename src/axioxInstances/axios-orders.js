import axios from 'axios';

const instance = axios.create({ //its not a global default because we will use authenthifcation later 
    baseURL: 'https://burgerbuilderrobv.firebaseio.com/',
});

export default instance;