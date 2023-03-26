import http from './http-common';

class DistrictService {

    getAllDistricts() {
        return http.get(`/districts`);
    }
    getDistrictByName(districtName) {
        return http.get(`/districts/name/${districtName}`);
    }


}

export default new DistrictService();
