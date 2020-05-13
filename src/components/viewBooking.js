import React, { Component } from 'react'
import { viewBookingData, confirmCancle } from '../actions/index'
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

class ViewBooking extends Component {
    state = {
        userId: sessionStorage.getItem('userId'),
        data: '',
        dialog_visible: false

    }
    componentDidMount() {
        if (this.state.userId) {

            this.props.viewBookingData(this.state.userId)
        }
        else {

            alert("You are not loggedIn! please Login First")
        }
    }
    confirmClaim = (data) => {
        this.setState({ dialog_visible: !this.state.dialog_visible, data: data })
    }
    onHide = (event) => {
        this.setState({ dialog_visible: false });
    }
    cancleBooking = () => {
        this.props.confirmCancle(this.state.data.bookingId, this.state.userId)
        this.setState({ dialog_visible: false });

    }

    render() {
        const footer = (
            <div>
                <Button label="Back" icon="pi pi-arrow-left" onClick={this.onHide} />
                <Button label="Confirm Cancellation" icon="pi pi-trash" onClick={this.cancleBooking} className="p-button-secondary" />
            </div>
        );
        if (this.props.hotdeals.viewBookingDataErrorMessage.length > 0) {
            return (
                <div>
                    <br></br>
                    <br></br>
                    <h4>Sorry you have not planned any trips with us yet!</h4>
                    <br>
                    </br>
                    <br></br>
                </div>
            )
        }

        return (
            this.props.hotdeals.viewBookingData.length ?
                <div className="container">
                    {this.props.hotdeals.viewBookingData.map((data, i) =>
                        <div key={i}>

                            <div className="text-center row badge-light">

                                <div className="col-md-8">
                                    <div >
                                        <br></br>
                                        <h6>Booking ID: {data.bookingId}</h6><br />
                                    </div>
                                    <h4>{data.destinationName}</h4>
                                    <h6>Trip starts on: {new Date(data.checkInDate).toDateString()}</h6>
                                    <h6>Trip starts on: {new Date(data.checkOutDate).toDateString()}</h6>
                                    <h6>Travellers: {data.noOfPersons}</h6>
                                </div>
                                <div className="col-md-4">
                                    <br /><br /><br />
                                    <h6>Fare Details</h6>
                                    <h6>${data.totalCharges}</h6>
                                    <h6>Travellers: {data.noOfPersons}</h6>
                                    <Button
                                        onClick={() => this.confirmClaim(data)}
                                        label="claim Refund"
                                        icon="pi pi-pencil"
                                        type="button"
                                        className="p-button-success"
                                    >
                                    </Button>
                                </div>
                                <br /><br />
                            </div>
                            <br></br>
                        </div>
                    )}
                    <div className="content-section implementation">
                        <Dialog
                            header="Confirmation"
                            visible={this.state.dialog_visible}
                            style={{ width: '50vw' }}
                            footer={footer}
                            onHide={this.onHide}
                            maximizable
                        >
                            <div>
                                <h6 className="text-danger"> Are you sure you want to Cancel Your Trip to {this.state.data.destinationName}</h6><br />
                                <h6 > Trip Start Date: {this.state.data.checkInDate}</h6>
                                <h6 > Trip End Date: {this.state.data.checkOutDate}</h6>
                                <h6 > Refund Amount: {this.state.data.totalCharges}</h6>

                            </div>
                        </Dialog>
                    </div>
                </div>
                : '')
    }
}
const mapStateToProps = state => ({
    user: state.user,
    hotdeals: state.hotdeals,
})
export default connect(mapStateToProps, { viewBookingData, confirmCancle })(ViewBooking)