import React, { Component } from "react";
import PetDataService from "../services/pet.service";

export default class Pet extends Component {
    constructor(props) {
        super(props);
        // this.onChangePetID = this.onChangePetID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeProfilePicture= this.onChangeProfilePicture.bind(this);

        this.getPet = this.getPet.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updatePet = this.updatePet.bind(this);
        this.deletePet = this.deletePet.bind(this);

        this.state = {
            currentPet: {
                pet_id: "",
                name: "",
                age: 0,
                gender: "",
                category: "",
                price: 0.0,
                message: "",
                profile_picture: "",
                published: false,
            },
            message: ""
        };
    }

    componentDidMount() {
        console.log(this.props)
        this.getPet(this.props.match.params.pet_id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentPet: {
                    ...prevState.currentPet,
                    name: name
                }
            };
        });
    }

    onChangeAge(e) {
        const age = e.target.value;

        this.setState(prevState => ({
            currentPet: {
                ...prevState.currentPet,
                age: age
            }
        }));
    }

    onChangeGender(e) {
        const gender = e.target.value;

        this.setState(prevState => ({
            currentPet: {
                ...prevState.currentPet,
                gender: gender
            }
        }));
    }

    onChangeCategory(e) {
        const category = e.target.value;

        this.setState(prevState => ({
            currentPet: {
                ...prevState.currentPet,
                category: category
            }
        }));
    }

    onChangePrice(e) {
        const price = e.target.value;

        this.setState(prevState => ({
            currentPet: {
                ...prevState.currentPet,
                price: price
            }
        }));
    }

    onChangeMessage(e) {
        const message = e.target.value;

        this.setState(prevState => ({
            currentPet: {
                ...prevState.currentPet,
                message: message
            }
        }));
    }

    onChangeProfilePicture(e) {
        const profile_picture = e.target.value;

        this.setState(prevState => ({
            currentPet: {
                ...prevState.currentPet,
                profile_picture: profile_picture
            }
        }));
    }

    getPet(pet_id) {
        console.log(`gettPet(${pet_id})`)
        console.log(pet_id)
        PetDataService.get(pet_id)
            .then(response => {
                this.setState({
                    currentPet: response.data
                });
                console.log(response.data);
                console.log(`just getPet(${pet_id})`)
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            pet_id: this.state.currentPet.pet_id,
            name: this.state.currentPet.name,
            age: this.state.currentPet.age,
            gender: this.state.currentPet.gender,
            category: this.state.currentPet.category,
            price:this.state.currentPet.price,
            message: this.state.currentPet.message,
            profile_picture: this.state.currentPet.profile_picture,
            published: status
        };

        if(data.age < 0)
        {
            alert("Age cannot be negative.")
        }
        else if(data.price < 0)
        {
            alert("Price cannot be negative.")
        }
        else {
            PetDataService.update(this.state.currentPet.pet_id, data)
                .then(response => {
                    this.setState(prevState => ({
                        currentPet: {
                            ...prevState.currentPet,
                            published: status
                        }
                    }));
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    updatePet() {
        if(this.state.currentPet.age < 0)
        {
            alert("Age cannot be negative.")
        }
        else if(this.state.currentPet.price < 0)
        {
            alert("Price cannot be negative.")
        }else {
            PetDataService.update(
                this.state.currentPet.pet_id,
                this.state.currentPet
            )
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        message: "The pet was updated successfully!"
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    deletePet() {
        PetDataService.delete(this.state.currentPet.pet_id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/pets')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentPet } = this.state;

        return (
            <div>
                {currentPet ? (
                    <div className="edit-form">
                        <h4>Pet {currentPet.pet_id}</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Pet Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentPet.name}
                                    onChange={this.onChangeName}
                                    name="name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    min={0}
                                    value={currentPet.age}
                                    onChange={this.onChangeAge}
                                    name="age"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    value={currentPet.gender}
                                    onChange={this.onChangeGender}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category: {currentPet.category}</label>
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="category">Category</label>*/}
                            {/*    <select*/}
                            {/*        name="category"*/}
                            {/*        id="category"*/}
                            {/*        value={currentPet.category}*/}
                            {/*        onChange={this.onChangeCategory}*/}
                            {/*    >*/}
                            {/*        <option value="Cat">Cat</option>*/}
                            {/*        <option value="Dog">Dog</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    step= "0.01"
                                    className="form-control"
                                    id="price"
                                    min={0}
                                    value={currentPet.price}
                                    onChange={this.onChangePrice}
                                    name="price"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Message">Message</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="message"
                                    value={currentPet.message}
                                    onChange={this.onChangeMessage}
                                    name="message"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="profile_picture">Profile Picture</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="profile_picture"
                                    value={currentPet.profile_picture}
                                    onChange={this.onChangeProfilePicture}
                                    name="profile_picture"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentPet.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentPet.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deletePet}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updatePet}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Pet...</p>
                    </div>
                )}
            </div>
        );
    }
}