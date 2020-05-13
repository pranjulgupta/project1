import React, { Component } from 'react'
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputSwitch } from 'primereact/inputswitch';
import { bookPackage } from '../actions/index'
import { Link } from 'react-router-dom';
import Pdf from "react-to-pdf";

const ref = React.createRef();
// import GenPrint from '../common/GenPrint'

class BookPackage extends Component {
    state = {
        data: "",
        loginform: {
            noOfTickets: this.props.hotdeals.bookingData.noOfTickets,
            startDate: this.props.hotdeals.bookingData.startDate,
            checked: this.props.hotdeals.bookingData.checked
        },
        loginformErrorMessage: {
            noOfTickets: "",
            startDate: ""
        },
        loginformValid: {
            noOfTickets: false,
            startDate: false,
            buttonActive: true
        },
        successMessage: "",
        errorMessage: "",
        totalAmount: this.props.hotdeals.bookingData.amount,
        endDate: this.props.hotdeals.bookingData.endDate,
        download:false
    }


    book=()=>{
        let bookData={}
        bookData.userId=this.props.user.userId
        bookData.destId=this.props.match.params.destId
        bookData.destinationName=this.state.data.name
        bookData.noOfPersons=this.state.loginform.noOfTickets;
        bookData.checkInDate=this.state.loginform.startDate;
        bookData.checkOutDate=this.state.endDate
        bookData.totalCharges=this.state.totalAmount
        bookData.timeStamp=Date.now().toString()
        this.props.bookPackage(bookData)
        // this.setState({bookPackageStatus})
    }

    calculateCharge = (e) => {
        console.log("e",e.value);
        
  // onChange={(e) => this.setState({ loginform: { ...this.state.loginform, checked: e.value } })}

        let charges = 0
        let newDate = new Date(this.state.loginform.startDate)
        let enddate = new Date(newDate.getTime() + this.state.data.noOfNights * 24 * 60 * 60 * 1000)
        if (e.value) {
            charges = this.state.loginform.noOfTickets * this.state.data.flightCharges * this.state.data.chargesPerPerson
          
           // this.props.setbookData(bookData)
            this.setState({
                totalAmount: charges, endDate: enddate.toDateString("mmmm/dd/yyyy"),
                loginform: { ...this.state.loginform, checked: e.value } 
            })
        }
        else {
            charges = this.state.loginform.noOfTickets * this.state.data.chargesPerPerson
            // let bookData={}
            // bookData.noOfTickets=this.state.loginform.noOfTickets;
            // bookData.startDate=this.state.loginform.startDate;
            // bookData.endDate=enddate.toDateString("mmmm/dd/yyyy")
            // bookData.amount=charges
            // bookData.checked=this.state.loginform.checked
           // this.props.setbookData(bookData)
            this.setState({ totalAmount: charges, endDate: enddate.toDateString("mmmm/dd/yyyy") ,
            loginform: { ...this.state.loginform, checked: e.value } })
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
        // console.log(this.state.loginform[name], name);
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


    componentDidMount() {
        if (this.props.match.params.destId[0] == "D") {
            const destData = this.props.hotdeals.destination.find(data => data.destinationId == this.props.match.params.destId)
            this.setState({ data: destData })
        }
        else {
            const destData = this.props.hotdeals.hotdeals.find(data => data.destinationId == this.props.match.params.destId)
            this.setState({ data: destData })
        }
    }

    printTicket=(data)=>{
        this.setState({download:!this.state.download})
    }
   

    render() {



        return (

            this.state.data && this.props.hotdeals.showBookId==false ? <div className="card bg-light text-dark package-card" key={this.state.data.destinationId}>
                <div className="card-body row">
                    <div className="col-md-8">
                        <h1>{this.state.data.name}</h1>
                        <div className="content-section implementation" style={{ textAlign: "initial" }}>
                            <Accordion multiple={true}>
                                <AccordionTab header="Overiview">
                                    <p>{this.state.data.details.about}</p>
                                </AccordionTab>
                                <AccordionTab header="Package Inclusions">
                                    <ul>
                                        {this.state.data.details.itinerary.packageInclusions.map((val, index) => <li key={index}>{val}</li>)}
                                    </ul>
                                </AccordionTab>
                                <AccordionTab header="Itinerary">
                                    <div>
                                        <h2>Day Wise Itinerary</h2>
                                        <div>
                                            <h4>Day 1</h4>
                                            <h6>{this.state.data.details.itinerary.dayWiseDetails.firstDay}</h6>
                                        </div>
                                        {
                                            this.state.data.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((data, index) =>
                                                <div key={index}>
                                                    <h4>Day {index + 2}</h4>
                                                    <h6>{data}</h6>
                                                </div>)
                                        }
                                        <div>
                                            <h4>Day {this.state.data.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h4>
                                            <h6>{this.state.data.details.itinerary.dayWiseDetails.lastDay}</h6>
                                        </div>
                                        <span className="text-danger">** This Itinerary is just a suggation. Itinerary can be modified as per
                            requirement.<a href="#">Contact Us</a> for more details.

                            </span>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>

                        <br />
                    </div>
                    <div className="col-md-4">
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
                                // onChange={(e) => this.setState({ loginform: { ...this.state.loginform, checked: e.value } })}
                                onChange={this.calculateCharge}
                                />                                    <br />
                            {/* <div class="form-group">
                                        <div class="text-danger">
                                            <h6>{{ errorMessage }}</h6>
                                        </div>
                                    </div> */}
                            <div>
            
                            </div>
                        </form>
                        <br />
                        <div>
                            {this.state.totalAmount > 0 ?
                            <div>
                                <h6 className="text-success">Your trip ends on {this.state.endDate}</h6>
                                <h5 className="text-success">and you will pay $ {this.state.totalAmount}</h5>
                                </div>
                                : <div><h6>** Charges Exclude flight charges</h6></div>}

                            <br />
                            <div className="col text-center">
                                <Button type="button" onClick={this.book} disabled={!this.state.loginformValid.buttonActive} label="Confirm Booking" className="p-button-success" />&nbsp;
                                <Button type="button" label="Go Back" className="p-button-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                : 
                this.state.data && this.props.hotdeals.showBookId==true && sessionStorage.getItem('userId')? <div>
                    {/* <h4 className="text-center">Booking Confirmed</h4>
                            <h4 className="text-center text-success">Congratulations! Trip planned to {this.state.data.name}</h4>
                            <h5 className="text-center">Trip starts on: {this.state.loginform.startDate}</h5>
                            <h5 className="text-center">Trip ends on: {this.state.endDate}</h5> */}
                            <DownloadTicket data={this.state.data} startDate={this.state.loginform.startDate} endDate={this.state.endDate}></DownloadTicket>
                            {/* <button type="button" onClick={()=>this.printTicket(this.state.data)}>Download Ticket</button> */}
{/* 
{                            this.state.download?<DownloadTicket data={data}></DownloadTicket>:''
} */}
                </div>
             :''
             )

    }
}

function DownloadTicket(props) {
    return (
      <div style={{textAlign:"initial"}} >
        
        <div ref={ref}>
        <h4 >Booking Confirmed</h4>
        <h4 className="text-success">Congratulations! Trip planned to {props.data.name}</h4>
        <h5 className="">Trip starts on: {props.startDate}</h5>
        <h5 className="">Trip ends on: {props.endDate}</h5>
        <Link to="/viewBookings">Click here to view your Bookings </Link>
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>DownloadTicket</button>}
        </Pdf>
        </div>
      </div>
    );
  }

const mapStateToProps = state => ({
    user: state.user,
    hotdeals: state.hotdeals,
})
export default connect(mapStateToProps,{bookPackage})(BookPackage)