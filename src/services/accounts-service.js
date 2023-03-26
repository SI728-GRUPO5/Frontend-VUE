import http from './http-common';


class AccountService {
    getAll() {
        return http.get(`/profile`);
    }

    getClientStatus() {
        return http.get(`/profile`);
    }

    update(data) {
        return http.put(`/profile/edit`, data);
    }

    delete(){
        return http.delete(`/profile`);
    }

    getUserData(id){
        return http.get(`/accounts/${id}`);
    }

    getUserByEmail(email){
        return http.get(`/accounts/email/${email}`)
    }
}

export default new AccountService();
