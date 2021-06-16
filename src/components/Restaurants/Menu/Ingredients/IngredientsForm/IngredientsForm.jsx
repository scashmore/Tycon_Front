import React from 'react';
import { updateRestaurantById } from '../../../../../api';


class IngredientsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {"itemNum": "", "id": `${Date.now() + Math.random()}`, "itemNumMax": "", "itemNumMin": "" },
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Item
        if (!fields["itemNumMax"]) {
            formIsValid = false;
            errors["itemNumMax"] = "Cannot be empty";
        }

        if (!fields["itemNumMin"]) {
            formIsValid = false;
            errors["itemNumMin"] = "Cannot be empty";
        }
        if (parseInt(fields["itemNumMin"]) > parseInt(fields["itemNumMax"])) {
            formIsValid = false;
            errors["itemNumMin"] = "Max must be less than min"
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleMenuNum = () => {
        var max = parseInt(this.state.fields.itemNumMin);
        var min = parseInt(this.state.fields.itemNumMax);
        var numb = (Math.floor(Math.random() * (max -min) + min));

        this.state.fields.itemNum = numb
    }

    handleSubmit(e) {
        e.preventDefault();
        const { restaurant } = this.props

        if (this.handleValidation()) {
            this.handleMenuNum();
            this.props.generateIngres(this.state.fields.itemNum, this.state.fields.id, this.props.item)
            
            updateRestaurantById(restaurant._id, restaurant)
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
                    <label>Max Number of Ingredients:</label>
                    <input ref="itemNumMax" type="number" min="1" max="15" onChange={this.handleChange.bind(this, "itemNumMax")} value={this.state.fields["itemNumMax"]}></input>
                    <label>Min Number of Ingredients:</label>
                    <input ref="itemNumMin" type="number" min="1" max="15" onChange={this.handleChange.bind(this, "itemNumMin")} value={this.state.fields["itemNumMin"]}></input>
                    <input className="formBtn" type="submit" value="Submit"/>
                </fieldset>
            </form>
        );
    }
}

export default IngredientsForm