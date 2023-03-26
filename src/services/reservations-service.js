import http from './http-common';

class ReservationsService {
    getViewUser(id) {
        return http.get(`/reservations/${id}`)
    }
    getAllByAccount(status) {
        return http.get(`/reservations/100?status=${status}`);
    }
    getViewProvider(id) {
        return http.get(`/reservation/${id}`)
    }
    getAllByOffice(officeId, status) {
        return http.get(`offices/${officeId}/reservations?status=${status}`);
    }

    addReservation(data, accountId) {
        return http.post(`/accounts/${accountId}/reservations/`, data)
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
        return http.delete(`/reservations`);
    }


}

export default new ReservationsService()
