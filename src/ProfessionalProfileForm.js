import React from "react";
import "./ProfessionalProfileForm.css";

class ProfessionalProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            description: props.description,
            tags: props.tags
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange(changeEvent) {
        this.setState({
            value: changeEvent.target.value
        });
    }

    handleFormSubmit(submitEvent) {
        alert("Submitted by " + this.state.value)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formContainer">
                    <label className="inputLabel">Location</label>
                    <input className="textInput" value={this.state.location} placeholder="Location" onChange={this.handleChange}></input>
                    <label className="inputLabel">Description</label>
                    <textarea className="textField" value={this.state.description} placeholder="Description" onChange={this.handleChange}></textarea>
                    <hr />
                    <input className="submitButton" type="submit" value="Submit" />
                    <button data-testid="closeButton" className="closeButton" onClick={this.props.modalFunction}>Close</button>
                </div>
            </form>
          );
      
    }
}

export default ProfessionalProfileForm;