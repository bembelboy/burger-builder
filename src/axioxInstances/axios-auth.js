import axios from 'axios'; // NOT IN USE

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAci8Zjyxj7TgmebIZG2Sf6lGunfDWyUqc'
});

export default instance