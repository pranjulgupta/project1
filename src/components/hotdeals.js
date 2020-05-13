import React, { Component } from "react";
import axios from "axios";
import { backendUrlUser, backendUrlPackage, backendUrlBooking } from '../BackendURL';
import { getHotDeals, getDestinationData } from '../actions/index'
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import BookingSideBar from './Primecomponent/BookingSideBar';
import { ProgressSpinner } from 'primereact/progressspinner';

class HotDeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotDeals: [],
            errorMessage: "",
            loadBook: false,
            showViewDetail: false,
            showBooking: false,
            data: "",
            activeIndex: 0,
            visibleLeft: false
        }
    }
    getItinerary = (aPackage) => {
        if (this.props.match.params.continent) {
            const packageData = this.props.hotdeals.destination.find((data) => data.destinationId == aPackage
            )
            this.setState({ data: packageData, visibleLeft: !this.state.visibleLeft, activeIndex: 0 })
        }
        else {
            const packageData = this.props.hotdeals.hotdeals.find((data) => data.destinationId == aPackage
            )
            this.setState({ data: packageData, visibleLeft: !this.state.visibleLeft, activeIndex: 0 })
        }
    };
    openBooking = (aPackage) => {
        if (this.props.match.params.continent) {
            const packageData = this.props.hotdeals.destination.find((data) => data.destinationId == aPackage)
            this.setState({ data: packageData, visibleLeft: !this.state.visibleLeft, activeIndex: 2 })
        }
        else {
            const packageData = this.props.hotdeals.hotdeals.find((data) => data.destinationId == aPackage)
            this.setState({ data: packageData, visibleLeft: !this.state.visibleLeft, activeIndex: 2 })
        }
    };

    sidebarVisible = () => {

        this.setState({ visibleLeft: !this.state.visibleLeft }, () => {
        })

    }
    getHotDeals = () => {
        // axios.get(backendUrlPackage+'/hotDeals')
        //     .then(response => {
        //         this.setState({ hotDeals: response.data, errorMessage: null })
        //     }).catch(error => {
        //         this.setState({ errorMessage: error.message, hotDeals: null })
        //     })
    }

    getitenary = (hotDeal) => {
    }

    loadBookingPage = (destId) => {
        if (sessionStorage.getItem('userId')) {
            this.setState({ loadBook: true })
        }
    }

    displayHotDeals = () => {
        let hotDealsArray = [];
        if (this.props.match.params.continent) {
            const hotDeals = this.props.hotdeals.destination.filter((data) => data.continent.toUpperCase() == this.props.match.params.continent.toUpperCase())
            if (hotDeals.length == 0) {
                return (<div><h1>No Package Found</h1></div>)
            }
            else {
                for (let hotDeal of hotDeals) {
                    let element = (
                        <div className="container" key={hotDeal.destinationId}>
                            <div className="row align-items-center no-gutters mb-4 mb-lg-5">
                                <div className="col-md-4">
                                    <div className="image">
                                        <img className="img-fluid mb-3 mb-lg-0" src={hotDeal.imageUrl} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="featured-text text-center text-lg-left">
                                        <h4>{hotDeal.name}</h4><span className="discount text-danger">{hotDeal.discount}% Instant Discount</span>
                                        <p className="text-dark mb-0">{hotDeal.details.about}</p>
                                    </div><br />
                                </div>
                                <div className="col-md-3">
                                    <h4>Prices Starting From:</h4>
                                    <div className="text-center text-success"><h6>${hotDeal.chargesPerPerson}</h6></div><br /><br />
                                    <div>  <Button
                                        onClick={() => this.getItinerary(hotDeal.destinationId)}
                                        label="View Details"
                                        icon="pi pi-info"
                                        type="button"
                                        className="btn p-button-info"
                                    >
                                    </Button></div><br />
                                    <div>
                                        <Button
                                            onClick={() => this.openBooking(hotDeal.destinationId)}
                                            label="Book"
                                            icon="pi pi-pencil"
                                            type="button"
                                            className="btn p-button-success"
                                        >
                                        </Button>
                                    </div>

                                </div>
                            </div>
                            <br />
                        </div >
                    );
                    hotDealsArray.push(element);
                }
            }
        }
        else {
            for (let hotDeal of this.props.hotdeals.hotdeals) {
                let element = (
                    <div className="container" key={hotDeal.destinationId}>
                        <div className="row align-items-center no-gutters mb-4 mb-lg-5">
                            <div className="col-md-4">
                                <div className="image">
                                    <img className="img-fluid mb-3 mb-lg-0" src={hotDeal.imageUrl} alt="" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="featured-text text-center text-lg-left">
                                    <h4>{hotDeal.name}</h4><span className="discount text-danger">{hotDeal.discount}% Instant Discount</span>
                                    <p className="text-dark mb-0">{hotDeal.details.about}</p>
                                </div><br />
                            </div>
                            <div className="col-md-3">
                                <h4>Prices Starting From:</h4>
                                <div className="text-center text-success"><h6>${hotDeal.chargesPerPerson}</h6></div><br /><br />
                                <div>  <Button
                                    onClick={() => this.getItinerary(hotDeal.destinationId)}
                                    label="View Details"
                                    icon="pi pi-info"
                                    type="button"
                                    className="btn p-button-info"
                                >
                                </Button></div><br />
                                <div>
                                    <Button
                                        onClick={() => this.openBooking(hotDeal.destinationId)}
                                        label="Book"
                                        icon="pi pi-pencil"
                                        type="button"
                                        className="btn p-button-success"
                                    >
                                    </Button>
                                </div>

                            </div>
                        </div>
                        <br />
                    </div >
                );
                hotDealsArray.push(element);
            }
        }
        return hotDealsArray;
    }

    componentDidMount() {

        this.props.getHotDeals();
        this.props.getDestinationData();
    }
    render() {

        return (
            <div>
                {/* <!-- hot deals normal list display --> */}
                <div className="row destination card">  {/* *ngIf="!bookingPage" */}
                    {this.props.hotdeals ? this.displayHotDeals() :
                        ""}
                    {this.state.visibleLeft ? <BookingSideBar
                        openBooking={this.openBooking}
                        getItinerary={this.getItinerary}
                        data={this.state.data}
                        visibleLeft={this.state.visibleLeft}
                        sidebarVisible={this.sidebarVisible}
                        activeIndex={this.state.activeIndex}
                    ></BookingSideBar> : ''}
                    {/* {this.state.showBooking || this.state.showViewDetail ? <BookingSideBar
                    openBooking={this.openBooking}
                    getItinerary={this.getItinerary}
                    data={this.state.data}
                ></BookingSideBar> : ''} */}
                </div >
            </div >
        )
    }
}
const mapStateToProps = state => ({
    hotdeals: state.hotdeals,
})
export default connect(mapStateToProps, { getHotDeals, getDestinationData })(HotDeals)