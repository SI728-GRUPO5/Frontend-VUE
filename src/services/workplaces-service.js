import http from './http-common';

class WorkplacesService {
    update(id,data) {
        return http.put(`/workplaces/${id}/edit`,data);
    }
    get() {
        return http.get(`/workplaces`);
    }
    delete(){
        return http.delete(`/workplaces`);
    }
}

export default new WorkplacesService();
