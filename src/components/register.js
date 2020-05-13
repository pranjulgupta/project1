import React, { Component } from 'react'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/index'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Register extends Component {
    state = {
        registerform: {
            name: '',
            emailId: '',
            password: '',
            contactNo: ''
        },
        registerformErrorMessage: {
            emailError: '',
            passwordError: '',
            nameError: '',
            contactNoError: ''
        },
        registerformValid: {
            email: false,
            password: false,
            name: false,
            contactNo: false,
            buttonActive: false
        },
        errorMessage: "",
        logIn: false
    }
    componentDidMount() {
        if (this.props.user.emailId && this.props.user.name) {
            const { registerform, registerformValid } = this.state;

            this.setState({
                registerform: { ...registerform, emailId: this.props.user.emailId, name: this.props.user.name },
                registerformValid: { ...registerformValid, email: true, name: true }
            });
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { registerform } = this.state;
        this.setState({
            registerform: { ...registerform, [name]: value }
        });
        this.validateField(name, value);
    }
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.registerformErrorMessage;
        let formValid = this.state.registerformValid;
        switch (fieldName) {
            case "name":
                let nameReg = /^[a-zA-Z]+[ a-zA-Z]*$/
                if (!value || value === "") {
                    fieldValidationErrors.nameError = "Please enter your Name";
                    formValid.name = false;
                } else if (!value.match(nameReg)) {
                    fieldValidationErrors.nameError = "Name should be a valid ";
                    formValid.name = false;
                } else {
                    fieldValidationErrors.nameError = "";
                    formValid.name = true;
                }
                break;
            case "emailId":
                let emailReg = /^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/
                if (!value || value === "") {
                    fieldValidationErrors.emailError = "Please enter your Email";
                    formValid.email = false;
                } else if (!value.match(emailReg)) {
                    fieldValidationErrors.emailError = "Email should be a valid ";
                    formValid.email = false;
                } else {
                    fieldValidationErrors.emailError = "";
                    formValid.email = true;
                }
                break;

            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNoError = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNoError = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNoError = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.passwordError = "Password is manadatory";
                    formValid.password = false;
                    // } else if (!(value.match(/[a-zA-z]/) && value.match(/[0-9]/) && value.match([/_/]))) {
                    //     // fieldValidationErrors.password = "Please Enter a valid password"
                    //     // formValid.password = false;
                } else {
                    fieldValidationErrors.passwordError = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password && formValid.email && formValid.name
        this.setState({
            registerformErrorMessage: fieldValidationErrors,
            registerformValid: formValid,
            successMessage: "",
            logIn: !this.state.logIn
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.registerUser(this.state.registerform)
    }

    render() {
        if (this.props.user.goToLogin == true) return <Redirect to={'/login'} />
        return (
            <div>
                <section id="registerPage" className="loginSection">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                                <h1>Register</h1>
                                <form onSubmit={this.handleSubmit}> {/* [formGroup]="loginForm" (ngSubmit)="login()" */}
                                    {this.props.user.name ? <div className="form-group">
                                        <label htmlFor="name">Name<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.registerform.name}
                                            id="name"
                                            name="name"
                                            className="form-control"
                                        />
                                    </div> : <div className="form-group">
                                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                value={this.state.registerform.name}
                                                onChange={this.handleChange}
                                                id="name"
                                                name="name"
                                                className="form-control"
                                            />
                                        </div>}
                                    {this.state.registerformErrorMessage.nameError ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.nameError}
                                    </span>)
                                        : null}

                                    {this.props.user.emailId ? <div className="form-group">
                                        <label htmlFor="emailId">Email Id<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.registerform.emailId}
                                            id="emailId"
                                            name="emailId"
                                            className="form-control"
                                        />
                                    </div> : <div className="form-group">
                                            <label htmlFor="emailId">Email Id<span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                value={this.state.registerform.emailId}
                                                onChange={this.handleChange}
                                                id="emailId"
                                                name="emailId"
                                                className="form-control"
                                            />
                                        </div>}
                                    {this.state.registerformErrorMessage.emailError ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.emailError}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="contactNo">Contact Number<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            value={this.state.registerform.contactNo}
                                            onChange={this.handleChange}
                                            id="contactNo"
                                            name="contactNo"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.contactNoError ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.contactNoError}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="password">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.registerform.password}
                                            onChange={this.handleChange}
                                            id="password"
                                            name="password"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.passwordError ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.passwordError}
                                    </span>)
                                        : null}<br />
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />
                                    {/* <div class="form-group">
                                        <div class="text-danger">
                                            <h6>{{ errorMessage }}</h6>
                                        </div>
                                    </div> */}
                                    <div>
                                        <button
                                            name="registerButton"
                                            type="submit"
                                            disabled={!this.state.registerformValid.buttonActive}
                                            className="btn btn-primary"
                                        >
                                            Register
                                    </button>

                                    </div>
                                </form>

                                {this.props.user.emailErrorMessage ? <div>
                                    {this.props.user.emailErrorMessage}   </div> : ''}

                                {/* <!--can be a button or a link based on need --> */}
                                Already a user?<Link to="/login"> Login</Link>                            </div>
                        </div>
                    </div>
                </section>
                {/* <div * ngIf= "!registerPage" >
            <router-outlet></router-outlet>
            </div > */}
                {/* *ngIf="!registerPage" */}
                {/* </div > */}
            </div>

        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})

// export default connect(mapStateToProps, {loginByMobile})(withStyles(useStyles)(Login))
export default connect(mapStateToProps, { registerUser })(Register)