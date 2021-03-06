import React, { Component } from "react";
import PetDataService from "../services/pet.service";
import { Link } from "react-router-dom";
import logo from "../shopLogo.png";

export default class PetsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.onChangeSearchGender = this.onChangeSearchGender.bind(this);
        this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);
        this.retrievePets = this.retrievePets.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePet = this.setActivePet.bind(this);
        this.removeAllPets = this.removeAllPets.bind(this);
        this.searchName = this.searchName.bind(this);
        this.searchGender = this.searchGender.bind(this)

        this.state = {
            pets: [],
            currentPet: null,
            currentIndex: -1,
            searchName: "",
            searchGender: "",
            searchCategory: ""
        };
    }

    componentDidMount() {
        this.retrievePets();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    onChangeSearchGender(e) {
        const searchGender = e.target.value;

        this.setState({
            searchGender: searchGender
        });
    }

    onChangeSearchCategory(e) {
        const searchCategory = e.target.value;

        this.setState({
            searchCategory: searchCategory
        });
    }

    retrievePets() {
        PetDataService.getAll()
            .then(response => {
                this.setState({
                    pets: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrievePets();
        this.setState({
            currentPet: null,
            currentIndex: -1
        });
    }

    setActivePet(pet, index) {
        this.setState({
            currentPet: pet,
            currentIndex: index
        });
    }

    removeAllPets() {
        PetDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchName() {
        console.log("searchName")
        console.log(this.state)
        this.setState({
            currentPet: null,
            currentIndex: -1
        });

        const newPet = {
            name: this.state.searchName,
            gender: this.state.searchGender,
            category: this.state.searchCategory
        }

        console.log(newPet)

        // PetDataService.findByName(this.state.searchName)
        PetDataService.findByName(newPet)
            .then(response => {
                this.setState({
                    pets: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchGender() {
        this.setState({
            currentPet: null,
            currentIndex: -1
        });

        PetDataService.findByGender(this.state.searchGender)
            .then(response => {
                this.setState({
                    pets: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { pets, currentPet, currentIndex, searchName, searchGender, searchCategory } = this.state;

        console.log(currentPet)
        console.log(pets)

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3" style={{width: "600px"}}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                            // style={{width: "120px"}}
                        />
                    {/* </div> */}
                         {/* <div className="form-group"> */}
                            {/* <label htmlFor="gender">Gender</label> */}
                            <select
                                name="gender"
                                id="gender"
                                required
                                className="form-control"
                                value={searchGender}
                                onChange={this.onChangeSearchGender}
                            >
                                <option value="" selected>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                         {/* </div> */}
                         {/* <div className="form-group"> */}
                            <select
                                name="category"
                                id="category"
                                required
                                className="form-control"
                                value={searchCategory}
                                onChange={this.onChangeSearchCategory}
                            >
                                <option value="" selected>Category</option>
                                <option value="Cat">Cat</option>
                                <option value="Dog">Dog</option>
                            </select>
                        {/* </div> */}
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Pets List</h4>

                    <ul className="list-group">
                        {pets &&
                        pets.map((pet, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActivePet(pet, index)}
                                key={index}
                            >
                                {pet.name}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllPets}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentPet ? (
                        <div>
                            <h4>Pet</h4>
                            <div>
                                <label>
                                    <strong>Image:</strong>
                                </label>{" "}
                                {/*{currentPet.profile_picture}*/}
                                {/*import currPetImg from currentPet.profile_picture*/}

                                {<img src={currentPet.profile_picture}/>}
                            </div>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentPet.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Message:</strong>
                                </label>{" "}
                                {currentPet.message}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentPet.published ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"/pets/" + currentPet.pet_id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Pet...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
