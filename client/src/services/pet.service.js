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
        //Issue with Post
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

    // findByName(name) {
    //     return http.get(`/pets?name=${name}`);
    // }

    findByName(pet) {
        return http.get(`/pets?name=${pet.name}&gender=${pet.gender}&category=${pet.category}`);
    }

    // findByName(pet) {
    //     return http.get(`/pets?name=${pet.name}&gender=${pet.gender}`);
    // }

    // findByGender(gender) {
    //     return http.get(`/pets?gender=${gender}`);
    // }
}

export default new PetDataService();