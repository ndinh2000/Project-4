import http from "../http-common";

class PetDataService {
    getAll() {
        return http.get("/pets");
    }

    get(pet_id) {
        return http.get(`/pets/${pet_id}`);
    }

    create(data) {
        return http.post("/pets", data);
    }

    update(pet_id, data) {
        return http.put(`/pets/${pet_id}`, data);
    }

    delete(pet_id) {
        return http.delete(`/pets/${pet_id}`);
    }

    deleteAll() {
        return http.delete(`/pets`);
    }

    findByName(name) {
        return http.get(`/pets?name=${name}`);
    }
}

export default new PetDataService();