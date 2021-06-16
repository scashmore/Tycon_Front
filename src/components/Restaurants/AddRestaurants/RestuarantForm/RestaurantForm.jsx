import React from 'react';
import './style.css';


class RestuarantForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {"name": "", "cuisine": "", "menu": "", "menuMin": "", "menuMax": "", "id": `${Date.now() + Math.random()}`},
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        //Cuisine

        if (!fields["cuisine"]) {
            formIsValid = false;
            errors["cuisine"] = "Cannot be empty";
        }

        if (typeof fields["cuisine"] !== "undefined") {
            if (!fields["cuisine"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["cuisine"] = "Only letters";
            }
        }

        //Menu Item #
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

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleMenuNum = () => {
        var max = parseInt(this.state.fields.menuMax);
        var min = parseInt(this.state.fields.menuMin);
        var numb = (Math.floor(Math.random() * (max -min) + min));

        this.state.fields.menu = numb
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            this.handleMenuNum();
            this.props.generateRestaurant(this.state.fields.name, this.state.fields.cuisine, this.state.fields.menu, this.state.fields.id)
            // console.log(this.state.fields.name, this.state.fields.cuisine, this.state.fields.menu, this.state.fields.id)
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
                    
                    <label>Restaurant Name:</label>
                    <input ref="name" type="text" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}></input>
                    <label>Cuisine Type:</label>
                    <input ref="cuisine" type="text" onChange={this.handleChange.bind(this, "cuisine")} value={this.state.fields["cuisine"]}></input>
                    <label>Max Number of Menu Itmes:</label>
                    <input ref="menuMax" type="number" min='1' max='15'onChange={this.handleChange.bind(this, "menuMax")} value={this.state.fields["menuMax"]}></input>
                    <label>Min Number of Menu Itmes:</label>
                    <input ref="menuMin" type="number" min='1' max='15'onChange={this.handleChange.bind(this, "menuMin")} value={this.state.fields["menuMin"]}></input>
                    <input className="formBtn" type="submit" value="Submit"/>
                </fieldset>
            </form>
        );
    }
}

export default RestuarantForm