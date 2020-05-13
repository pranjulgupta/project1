import React, { Component } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { TabView, TabPanel } from 'primereact/tabview';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setbookData } from '../../actions/index'

class BookingSideBar extends Component {
    state = {
        loginform: {
            noOfTickets: "",
            startDate: "",
            checked: true
        },
        loginformErrorMessage: {
            noOfTickets: "",
            startDate: ""
        },
        loginformValid: {
            noOfTickets: false,
            startDate: false,
            buttonActive: false
        },
        successMessage: "",
        errorMessage: "",
        loadHome: false,
        userId: "",
        packageData: this.props.data,
        visibleLeft: this.props.visibleLeft,
        activeIndex: this.props.activeIndex,
        totalAmount: 0,
        endDate: '',
        goToLogin: false,
        goToBookPackage: false,
    }

    calculateCharge = () => {
        let charges = 0
        let newDate = new Date(this.state.loginform.startDate)
        let enddate = new Date(newDate.getTime() + this.state.packageData.noOfNights * 24 * 60 * 60 * 1000)
        if (this.state.loginform.checked) {
            charges = this.state.loginform.noOfTickets * this.state.packageData.flightCharges * this.state.packageData.chargesPerPerson
            let bookData = {}
            bookData.noOfTickets = this.state.loginform.noOfTickets;
            bookData.startDate = this.state.loginform.startDate;
            bookData.endDate = enddate.toDateString("mmmm/dd/yyyy")
            bookData.amount = charges
            bookData.checked = this.state.loginform.checked
            this.props.setbookData(bookData)
            this.setState({
                totalAmount: charges, endDate: enddate.toDateString("mmmm/dd/yyyy")
            })
        }
        else {
            charges = this.state.loginform.noOfTickets * this.state.packageData.chargesPerPerson
            let bookData = {}
            bookData.noOfTickets = this.state.loginform.noOfTickets;
            bookData.startDate = this.state.loginform.startDate;
            bookData.endDate = enddate.toDateString("mmmm/dd/yyyy")
            bookData.amount = charges
            bookData.checked = this.state.loginform.checked
            this.props.setbookData(bookData)
            this.setState({ totalAmount: charges, endDate: enddate.toDateString("mmmm/dd/yyyy") })
        }
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

    handleSubmit = (event) => {
        event.preventDefault();
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "noOfTickets":
                if (value == '') {
                    fieldValidationErrors.noOfTickets = 'Field Required'
                    formValid.noOfTickets = false
                } else if (value < 1) {
                    fieldValidationErrors.noOfTickets = 'Number of tickets can not be less than 1'
                    formValid.noOfTickets = false
                    // invalid
                } else if (value > 10) {
                    fieldValidationErrors.noOfTickets = 'You can book 10 tickets at a time'
                    formValid.noOfTickets = false
                    // invalid
                }
                else {
                    fieldValidationErrors.noOfTickets = ''
                    formValid.noOfTickets = true
                    // valid
                }
                break;
            case "startDate":
                const today = new Date();
                const userDate = new Date(value)
                if (value === "") {
                    fieldValidationErrors.startDate = 'Field Required'
                    formValid.startDate = false
                } else if (userDate.getTime() <= today.getTime()) {
                    fieldValidationErrors.startDate = 'Booking date can not be before today'
                    formValid.startDate = false
                } else {
                    fieldValidationErrors.startDate = ''
                    formValid.startDate = true
                }
                break;

            default:
                break;
        }
        formValid.buttonActive = formValid.noOfTickets && formValid.startDate;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    book = () => {

        if (sessionStorage.getItem('userId') == null) {
            alert("You are not loggedIn! please Login First")
            this.setState({ goToLogin: !this.state.goToLogin })

        }
        else {
            this.setState({ goToBookPackage: !this.state.goToBookPackage })
            // this.props.sidebarVisible()
        }
    }

    render() {
        if (this.state.goToLogin) return <Redirect to={'/login'} />
        if (this.state.goToBookPackage) return <Redirect to={'/book/' + this.props.data.destinationId} />

        return (
            <div className="content-section implementation" style={{ textAlign: "initial" }}>
                <Sidebar position="right" style={{ width: "60em" }} visible={this.state.visibleLeft} baseZIndex={1000000} onHide={this.props.sidebarVisible}>
                    <div className="content-section implementation">
                        <h3>{this.state.packageData.name}</h3>
                        <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
                            <TabPanel header="OverView" rightIcon="pi pi-eye">
                                <div className="card bg-light text-dark package-card" key={this.state.packageData.destinationId}>
                                    <div className="card-body row">
                                        <div className="col-md-6">
                                            <img className="package-image" src={this.state.packageData.imageUrl} alt="destination comes here" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="featured-text text-center text-lg-left">
                                                <h4>Package Includes:</h4>
                                                <ul>
                                                    {this.state.packageData.details.itinerary.packageInclusions.map((val, index) => <li key={index}>{val}</li>)}
                                                </ul>
                                            </div>
                                            <br />
                                        </div>
                                        <div className="card-body row">
                                            <div className="col-md-12">
                                                <h4>Tour OverView:</h4>
                                                <div className="text-center"><h6>{this.state.packageData.details.about}</h6></div><br />
                                                {/* <div><button className="btn btn-primary book" onClick={() => this.getItinerary(data.destinationId)}>View Details</button></div><br />
                    <div><button className="btn btn-primary book" onClick={() => this.openBooking(data.destinationId)}>Book </button>  </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Itinerary" rightIcon="pi pi-calendar-plus">
                                <div>
                                    <h4>Day 1</h4>
                                    <h6>{this.state.packageData.details.itinerary.dayWiseDetails.firstDay}</h6>
                                </div>
                                {
                                    this.state.packageData.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((data, index) =>
                                        <div key={index}>
                                            <h4>Day {index + 2}</h4>
                                            <h6>{data}</h6>
                                        </div>)
                                }
                                <div>
                                    <h4>Day {this.state.packageData.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h4>
                                    <h6>{this.state.packageData.details.itinerary.dayWiseDetails.lastDay}</h6>
                                </div>
                                <span className="text-danger">** This Itinerary is just a suggation. Itinerary can be modified as per
                            requirement.<a href="#">Contact Us</a> for more details.

                            </span>
                            </TabPanel>
                            <TabPanel header="Book" rightIcon="pi pi-pencil">
                                <h4>** Charges per person: ${this.state.packageData.chargesPerPerson}</h4>
                                <form className="form" onSubmit={this.handleSubmit}> {/* [formGroup]="loginForm" (ngSubmit)="login()" */}
                                    <div className="form-group">
                                        <label htmlFor="noOfTickets">Number Of Travellers<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            value={this.state.loginform.noOfTickets}
                                            onChange={this.handleChange}
                                            id="noOfTickets"
                                            name="noOfTickets"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.noOfTickets ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.noOfTickets}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="startDate">Trip Start Date</label>
                                        <input type="date" className="form-control"
                                            name="startDate"
                                            id="startDate"
                                            value={this.state.loginform.startDate}
                                            onChange={this.handleChange} />
                                    </div>
                                    {this.state.loginformErrorMessage.startDate ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.startDate}
                                    </span>)
                                        : null}<br />
                                    <label htmlFor="startDate">Include Flights:</label>&nbsp;
                                     <InputSwitch checked={this.state.loginform.checked} style={{ marginTop: '8px', marginBottom: '-8px' }}
                                        onChange={(e) => this.setState({ loginform: { ...this.state.loginform, checked: e.value } })} />                                    <br />
                                    {/* <div class="form-group">
                                        <div class="text-danger">
                                            <h6>{{ errorMessage }}</h6>
                                        </div>
                                    </div> */}
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={!this.state.loginformValid.buttonActive}
                                            className="btn btn-primary"
                                            onClick={this.calculateCharge}
                                        >
                                            Calculate Charges
                                    </button>
                                    </div>
                                </form>
                                <br />
                                <div>
                                    {this.state.totalAmount > 0 ?
                                        <h6 className="text-success">Your trip ends on {this.state.endDate} and you will pay $ {this.state.totalAmount}</h6>
                                        : <div><h6>** Charges Exclude flight charges</h6></div>}

                                    <br />
                                    <div className="col text-center">
                                        <Button type="button" onClick={this.book} disabled={!this.state.loginformValid.buttonActive} label="Book" className="btn p-button-success" />&nbsp;
                                <Button type="button" onClick={this.props.sidebarVisible} label="Cancel" className="btn p-button-secondary" />

                                    </div>
                                </div>

                            </TabPanel>
                        </TabView>
                    </div>
                    {/* <h1 style={{fontWeight:'normal'}}>Left Sidebar</h1> */}
                </Sidebar>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps, { setbookData })(BookingSideBar)