import React from 'react';
import { updateRestaurantById } from '../../../api';

class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {"name": "", "cuisine": "", "menu": "", "menuMax": "", "menuMin": ""},
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Cuisine
        //Name

        if (!fields["name"]) {
            formIsValid = false;
        }

        //Cuisine

        if (!fields["cuisine"]) {
            formIsValid = false;
        }

        if (typeof fields["cuisine"] !== "undefined") {
            if (!fields["cuisine"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["cuisine"] = "Only letters";
            }
        }


        //Menu
        if (!fields["menuMax"]) {
            formIsValid = false;
            errors["menuMax"] = "Cannot be empty";
        }
        if (!fields["menuMin"]) {
            formIsValid = false;
            errors["menuMin"] = "Cannot be empty";
        }
        if (parseInt(fields["menuMin"]) > parseInt(fields["menuMax"])) {
            formIsValid = false;
            errors["menuMin"] = "Max must be less than min"
        }

        return formIsValid
    }

    handleMenuNum = () => {
        var max = parseInt(this.state.fields.menuMax);
        var min = parseInt(this.state.fields.menuMin);
        var numb = (Math.floor(Math.random() * (max -min) + min));

        this.state.fields.menu = numb
    }

    handleSubmit(e) {
        e.preventDefault();
        const { restaurants } = this.props
        if (this.handleValidation()) {
            this.handleMenuNum();
            this.props.updateRestaurantName(this.state.fields.name, this.props.restId);
            this.props.updateRestaurantCuisine(this.state.fields.cuisine, this.props.restId);
            this.props.updateRestaurantMenu(this.state.fields.menu, this.props.restId)
            
            //make api call to the backend to update the current restaurant
            updateRestaurantById(restaurants._id, restaurants)
            this.props.handleClose();
        } else {
            alert("Form has errors.")
        }
        
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset className="restForm">                    
                    <label>Change Restaurant Name:</label>
                    <input ref="name" type="text" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} placeholder={`${this.props.restName}`}></input>
                    <label>Change Cuisine Type:</label>
                    <input ref="cuisine" type="text" onChange={this.handleChange.bind(this, "cuisine")} value={this.state.fields["cuisine"]} placeholder={`${this.props.restCuisine}`}></input>
                    <label> Change Max Number of Menu Itmes:</label>
                    <input ref="menu" type="number" min='1' max='15'onChange={this.handleChange.bind(this, "menuMax")} value={this.state.fields["menuMax"]} placeholder={`${this.props.restMenuNum}`}></input>
                    <label> Change Min Number of Menu Itmes:</label>
                    <input ref="menu" type="number" min='1' max='15'onChange={this.handleChange.bind(this, "menuMin")} value={this.state.fields["menuMin"]} placeholder={`${this.props.restMenuNum}`}></input>
                    <input className="formBtn" type="submit" value="Submit"/>
                </fieldset>
            </form>
        );
    }
}

export default EditForm