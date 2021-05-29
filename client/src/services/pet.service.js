import http from "../http-common";

class PetDataService {
    getAll() {
        return http.get("/pets");
    }

    get(pet_id) {
        console.log(`get(${pet_id}) from PetDataService`)
        console.log(http)
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

    findByGender(gender) {
        return http.get(`/pets?gender=${gender}`);
    }

    findByPetType(pet_type)
    {
        return http.get(`/pets?pet_type=${pet_type}`);
    }

    findByAll(name,gender,pet_type)
    {
        return http.get(`/pets?name=${name}&gender=${gender}&pet_type=${pet_type}`);
    }
}

export default new PetDataService();