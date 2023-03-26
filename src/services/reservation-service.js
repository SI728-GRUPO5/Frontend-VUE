import http from './http-common';

class ReservationService {
    getAllByAccount(status) {
        return http.get(`/accounts/100/reservations?status=${status}`);
    }

    getAllByOfficeNoStatus(officeId) {
        return http.get(`offices/${officeId}/reservations`);
    }

    getAllByOffice(officeId, status) {
        return http.get(`offices/${officeId}/reservations?status=${status}`);
    }

    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/reservations/id?id=${id}`);
    }

    setStatus(id, status) {
        console.log('id:'+id);
        console.log('status'+status);
        return http.patch(`/reservations/${id}?status=${status}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new ReservationService();
