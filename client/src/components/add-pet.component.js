import React, { Component } from "react";
import PetDataService from "../services/pet.service";

export default class AddPet extends Component {
    constructor(props) {
        super(props);
        this.onChangePetID = this.onChangePetID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeProfilePicture= this.onChangeProfilePicture.bind(this);

        this.savePet = this.savePet.bind(this);
        this.newPet = this.newPet.bind(this);

        this.state = {
            pet_id: "",
            name: "",
            age: 0,
            gender: "Male",
            category: "Cat",
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

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
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
            category: this.state.category,
            price: this.state.price,
            message: this.state.message,
            profile_picture: this.state.profile_picture,
        };

        let idName = ["C","D"]
        if(idName.indexOf(data.pet_id.substring(0,1)) === -1 || !(/^\d+$/.test(data.pet_id.substring(1,data.pet_id.length))))
        {
            alert("Invalid pet id. If its a cat, follow this format: C(pet_id). For example: C101")
        }
        else if(idName.indexOf(data.pet_id.substring(0,1)) !== -1 && /^\d+$/.test(data.pet_id.substring(1,data.pet_id.length))
                && ((data.pet_id.startsWith("C",0) && data.category === "Dog") || (data.pet_id.startsWith("D",0) && data.category === "Cat")))
        {
            //valid pet id name
            alert("Pet id and category does not match.")
        }
        else if(data.age < 0)
        {
            alert("Age cannot be negative.")
        }
        else if(data.price < 0)
        {
            alert("Price cannot be negative.")
        }
        else {
            PetDataService.create(data)
                .then(response => {
                    this.setState({
                        pet_id: response.data.pet_id,
                        name: response.data.name,
                        age: response.data.age,
                        gender: response.data.gender,
                        category: response.data.category,
                        price: response.data.price,
                        message: response.data.message,
                        profile_picture: response.data.profile_picture,
                        published: response.data.published,

                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    //NOTE: This is throwing error
                    console.log(e);
                    alert("Pet id exists.")
                });
        }
    }

    newPet() {
        this.setState({
            pet_id: "",
            name: "",
            age: 0,
            gender: "",
            category: "",
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
                        {/*<form onSubmit={this.savePet} className="form-group">*/}
                            <label htmlFor="pet_id">Pet ID</label>
                            <input
                                type="text"
                                placeholder={"ex: C101, D101"}
                                className="form-control"
                                id="pet_id"
                                required
                                value={this.state.pet_id}
                                onChange={this.onChangePetID}
                                name="pet_id"
                            />
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

                            {/* <br/> */}
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                min={0}
                                required
                                value={this.state.age}
                                onChange={this.onChangeAge}
                                name="age"
                            />

                            {/* <br/> */}
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                required
                                value={this.state.gender}
                                onChange={this.onChangeGender}
                                name="gender"
                                className="form-control"
                                style={{width: "80%"}}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            {/* <br/> */}
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                required
                                value={this.state.category}
                                onChange={this.onChangeCategory}
                                name="category"
                                className="form-control"
                                style={{width: "80%"}}
                            >
                                <option value="Cat">Cat</option>
                                <option value="Dog">Dog</option>
                            </select>

                            {/* <br/> */}
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                step= "0.01"
                                className="form-control"
                                id="price"
                                min={0}
                                required
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                name="price"
                            />

                            {/* <br/> */}
                            <label htmlFor="Message">Message</label>
                            <textarea
                                // type="text"
                                className="form-control"
                                id="message"
                                required
                                value={this.state.message}
                                onChange={this.onChangeMessage}
                                name="message"
                                style={{height: "100px", overflow: "auto"}}
                            />

                            {/* <br/> */}
                            <label htmlFor="profile_picture">Profile Picture</label>
                            <input
                                type="text"
                                className="form-control"
                                id="profile_picture"
                                required
                                value={this.state.profile_picture}
                                onChange={this.onChangeProfilePicture}
                                name="profile_picture"
                            />
                            <br/>
                            {/*<button type="submit" className="btn btn-success">*/}
                            {/*    Submit*/}
                            {/*</button>*/}
                        </div>
                        {/*</form>*/}
                        <button  onClick={this.savePet} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
