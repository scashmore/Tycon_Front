import React from 'react';

class MenuForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {"item": "", "description": ""},
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Item
        if (!fields["item"]) {
            formIsValid = false;
            errors["item"] = "Cannot be empty";
        }

        if (typeof fields["item"] !== "undefined") {
            if (!fields["item"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["item"] = "Only letters";
            }
        }

        //Description
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            this.props.updateMenuItem(this.state.fields.item, this.props.idx)
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
                    <label>Item Name:</label>
                    <input ref="item" type="text" onChange={this.handleChange.bind(this, "item")} value={this.state.fields["item"]} placeholder={`${this.props.menuItem}`}></input>
                    <label>Item Description:</label>
                    <textarea rows="4" cols="50" maxLength="150" onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]} placeholder={`${this.props.menuDescrip}`}></textarea>
                    <input className="formBtn" type="submit" value="Submit"/>
                </fieldset>
            </form>
        );
    }
}

export default MenuForm