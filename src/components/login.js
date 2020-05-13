import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { backendUrlUser } from '../BackendURL';
import { Button } from 'primereact/button';

import ApiCall from '../apiCall/index'
import { connect } from 'react-redux';
import { loginByMobile, checkUser } from '../actions/index'
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCtd3dErJMydilQMCJ60NavMCVMVAiVa64",
    authDomain: "wanderlust-24489.firebaseapp.com",
    databaseURL: "https://wanderlust-24489.firebaseio.com",
    projectId: "wanderlust-24489",
    storageBucket: "wanderlust-24489.appspot.com",
    messagingSenderId: "371427794283",
    appId: "1:371427794283:web:c5ca86257ef432c6b8002e",
    measurementId: "G-2P27PDDW8Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 245,
        flexGrow: 1,
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    media: {
        height: 100,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: ""
        }
    }

    componentDidMount() {
        //  this.loginCheck()   
    }


    handleClick = () => {
        this.setState({ loadRegister: true })
    }


    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
    }

    login = () => {
        const { loginform } = this.state;
        this.props.loginByMobile(loginform)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.login();
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                    // } else if (!(value.match(/[a-zA-z]/) && value.match(/[0-9]/) && value.match([/_/]))) {
                    //     // fieldValidationErrors.password = "Please Enter a valid password"
                    //     // formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }
    googleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            this.setState({
                userId: user.displayName, loadHome: true
            })
            this.props.checkUser({ email: user.email }, { name: user.displayName })
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            this.setState({ errorMessage: error.message })
            // ...
        });
    }


    render() {

        if (this.props.user) {

            sessionStorage.setItem("contactNo", this.props.user.contactNumber);
            sessionStorage.setItem("userId", this.props.user.userId);
            sessionStorage.setItem("userName", this.props.user.userName);

        }
        if (this.props.user.loadHome === true) return <Redirect to={'/home/' + this.props.user.userId} />
        if (this.state.loadRegister === true || this.props.user.registerEmail == true) return <Redirect to={'/register'} />
        return (
            <div>
                <section id="loginPage" className="loginSection">    {/* *ngIf="!registerPage"  */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                                {this.props.user.goToLogin ? <h4 className="text-info">Registration Successfull</h4> : ''}
                                <h1>Login</h1>
                                <form className="form" onSubmit={this.handleSubmit}> {/* [formGroup]="loginForm" (ngSubmit)="login()" */}
                                    <div className="form-group">
                                        <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            value={this.state.loginform.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.contactNo}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.password ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.password}
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
                                            name="loginButton"
                                            type="submit"
                                            disabled={!this.state.loginformValid.buttonActive}
                                            className="btn btn-primary"
                                        >
                                            Login
                                    </button>
                                        <div>OR</div>
                                        <Button
                                            onClick={this.googleLogin}
                                            label="Gmail"
                                            icon="pi pi-envelope"
                                            type="button"
                                            className="p-button-danger"
                                        >
                                        </Button>
                                    </div>
                                </form>
                                <br />
                                {this.props.user.errorMessage ? <div>
                                    {this.props.user.errorMessage}   </div> : ''}
                                <br />
                                {/* <!--can be a button or a link based on need --> */}
                                <button className="btn btn-primary" onClick={this.handleClick} >Click here to Register</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

// export default connect(mapStateToProps, {loginByMobile})(withStyles(useStyles)(Login))
export default connect(mapStateToProps, { loginByMobile, checkUser })(Login)