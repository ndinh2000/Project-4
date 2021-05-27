import React, { Component } from "react";
import PetDataService from "../services/pet.service";

export default class AddPet extends Component {
    constructor(props) {
        super(props);
        this.onChangePetID = this.onChangePetID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeProfilePicture= this.onChangeProfilePicture.bind(this);

        this.savePet = this.savePet.bind(this);
        this.newPet = this.newPet.bind(this);

        this.state = {
            pet_id: "",
            name: "",
            age: 0,
            gender: "",
            price: 0.0,
            message: "",
            profile_picture: "",
            published: false,

            submitted: false
        };
    }

    onChangePetID(e) {
        this.setState({
            pet_id: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    onChangeProfilePicture(e) {
        this.setState({
            profile_picture: e.target.value
        });
    }

    savePet() {
        var data = {
            pet_id: this.state.pet_id,
            name: this.state.name,
            age: this.state.age,
            gender: this.state.gender,
            price: this.state.price,
            message: this.state.message,
            profile_picture: this.state.profile_picture,
        };

        PetDataService.create(data)
            .then(response => {
                this.setState({
                    pet_id: response.data.pet_id,
                    name: response.data.name,
                    age: response.data.age,
                    gender: response.data.gender,
                    price: response.data.price,
                    message: response.data.message,
                    profile_picture: response.data.profile_picture,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newPet() {
        this.setState({
            pet_id: "",
            name: "",
            age: 0,
            gender: "",
            price: 0.0,
            message: "",
            profile_picture: "",
            published: false,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newPet}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="pet_id">Pet ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pet_id"
                                required
                                value={this.state.pet_id}
                                onChange={this.onChangePetID}
                                name="pet_id"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Pet Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
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
                                required
                                value={this.state.age}
                                onChange={this.onChangeAge}
                                name="age"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                name="gender"
                                id="gender"
                                required
                                value={this.state.gender}
                                onChange={this.onChangeGender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                step= "0.01"
                                className="form-control"
                                id="price"
                                required
                                value={this.state.price}
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
                                required
                                value={this.state.message}
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
                                value={this.state.profile_picture}
                                onChange={this.onChangeProfilePicture}
                                name="profile_picture"
                            />
                        </div>

                        <button onClick={this.savePet} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
