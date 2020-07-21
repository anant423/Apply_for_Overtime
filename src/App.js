import React, { Component } from "react";
import "./App.css";

const HoursRegex = RegExp(/^[0-9]*$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      StartDate: null,
      EndDate: null,
      Hours: null,
      formErrors: {
        StartDate: "",
        EndDate: "",
        Hours: ""
      }
    };
  }

  handleSubmit = e => {
    if (formValid(this.state)) {
      alert(`Overtime Apply Successfull !!!!`);
      console.log(this.state);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      alert(`Please fill all the fields properly`);
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "StartDate":
        formErrors.StartDate =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "EndDate":
        formErrors.EndDate =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "Hours":
        formErrors.Hours = HoursRegex.test(value) ? "" : "Input in Digits";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Apply for Overtime</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="StartDate">
              <label htmlFor="StartDate">Start Date</label>
              <input
                className={formErrors.StartDate.length > 0 ? "error" : null}
                placeholder=""
                type="date"
                name="StartDate"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.StartDate.length > 0 && (
                <span className="errorMessage">{formErrors.StartDate}</span>
              )}
            </div>
            <div className="EndDate">
              <label htmlFor="">End Date</label>
              <input
                className={formErrors.EndDate.length > 0 ? "error" : null}
                placeholder=""
                type="date"
                name="EndDate"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.EndDate.length > 0 && (
                <span className="errorMessage">{formErrors.EndDate}</span>
              )}
            </div>
            <div className="Hours">
              <label htmlFor="Hours">Hours</label>
              <input
                className={formErrors.Hours.length > 0 ? "error" : null}
                placeholder="Hours"
                type="text"
                name="Hours"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Hours.length > 0 && (
                <span className="errorMessage">{formErrors.Hours}</span>
              )}
            </div>
            <div className="Apply">
              <button type="submit">Apply</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
