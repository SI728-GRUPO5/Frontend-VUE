// import axios from 'axios';
import http from './http-common';

// const API_URL = 'http://localhost:5001/api/accounts';

class AuthService {
    login(user) {
        return http.post('/accounts/authenticate', {
            username: user.username,
            password: user.password
        })
            .then(response => {
                if (response.data.token) {
                    console.log(`user: ${response.data}`);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout(){
        localStorage.removeItem('user');
    }
    register(user){
        return http.post( '/accounts',{
            email:user.email,
            password: user.password,
            identification:user.identification,
            accType: user.accType,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            premium: user.premium
        });
    }
}

export default new AuthService();
