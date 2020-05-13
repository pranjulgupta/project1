import { combineReducers } from 'redux';
import * as actionTypes from '../actions/type';
import hotdeals from '../components/hotdeals';
import { viewBookingData } from '../actions';
const initialdata = {
    contactNumber: "",
    userId: "",
    userName: "",
    loadHome: false,
    errorMessage: "",
    successMessage: "",
    registerEmail: false,
    emailId: "",
    name: "",
    emailErrorMessage: '',
    goToLogin: false,
    hotdealsErrorMessage: '',
    hotdeals: [],
    destination: [],
    destinationErrorMessage: [],
    bookingData: '',
    newBookingId: '',
    showBookId: true,
    bookIdErrorMessage: '',
    viewBookingDataErrorMessage: '',
    viewBookingData: ""
}
const userReducer = (state = initialdata, action) => {
    switch (action.type) {

        case actionTypes.register_user:
            if (action.payload.error == null) {

                return Object.assign({}, state, {
                    goToLogin: !state.goToLogin,
                    emailErrorMessage: '',
                    registerEmail: false,
                })
            }
            else {

                return Object.assign({}, state, {
                    emailErrorMessage: action.payload.error
                })
            }
        case actionTypes.check_user:
            if (action.payload.userId) {

                return Object.assign({}, state, {
                    contactNumber: action.payload.contactNo,
                    userId: action.payload.userId,
                    userName: action.payload.name,
                    loadHome: !state.loadHome,
                    errorMessage: "",
                })
            }
            else {

                return Object.assign({}, state, {
                    errorMessage: action.payload.error,
                    registerEmail: !state.registerEmail,
                    emailId: action.payload.email.email,
                    name: action.payload.name.name

                })
            }

        case actionTypes.logIn_Mobile:
            if (action.payload.error == null) {

                return Object.assign({}, state, {
                    contactNumber: action.payload.contactNo,
                    userId: action.payload.userId,
                    userName: action.payload.name,
                    loadHome: !state.loadHome,
                    goToLogin: false,
                    errorMessage: ''

                })
            }
            else {

                return Object.assign({}, state, {
                    errorMessage: action.payload.error
                })
            }
        case actionTypes.log_out:
            return Object.assign({}, state, {
                contactNumber: "",
                userId: "",
                userName: "",
                loadHome: false,
                errorMessage: "",
                successMessage: "",
                registerEmail: false,
                emailId: "",
                name: "",
                emailErrorMessage: '',
                goToLogin: false,
                hotdealsErrorMessage: '',
                hotdeals: [],
                destination: [],
                destinationErrorMessage: [],
                bookingData: '',
                newBookingId: '',
                showBookId: true,
                bookIdErrorMessage: '',
                viewBookingDataErrorMessage: '',
                viewBookingData: ""

            })
        default:
            return state
    }
}
const hotDealReducer = (state = initialdata, action) => {
    switch (action.type) {
        case actionTypes.hot_deals:
            if (action.payload.error == null) {

                return Object.assign({}, state, {
                    hotdeals: action.payload,
                })
            }
            else {

                return Object.assign({}, state, {
                    hotdealsErrorMessage: action.payload.error
                })
            }

        case actionTypes.get_destination:
            if (action.payload.error == null) {

                return Object.assign({}, state, {
                    destination: action.payload,

                })
            }
            else {

                return Object.assign({}, state, {
                    destinationErrorMessage: action.payload.error
                })
            }
        case actionTypes.set_bookData:
            return Object.assign({}, state, {
                bookingData: action.payload,
                newBookingId: "",
                showBookId: false

            })
        case actionTypes.book_package:
            if (action.payload.error == null) {

                return Object.assign({}, state, {
                    newBookingId: action.payload,
                    showBookId: !state.showBookId,
                    bookIdErrorMessage: ''
                })
            }
            else {

                return Object.assign({}, state, {
                    bookIdErrorMessage: action.payload.error
                })
            }

        case actionTypes.cancel_booking:
            if (action.payload.error == null) {
                return Object.assign({}, state, {
                    viewBookingData: action.payload,
                    viewBookingDataErrorMessage: ''
                })
            }
            else {

                return Object.assign({}, state, {
                    viewBookingDataErrorMessage: action.payload.error
                })
            }
        case actionTypes.view_booking:
            if (action.payload.error == null) {

                return Object.assign({}, state, {
                    viewBookingData: action.payload,
                    viewBookingDataErrorMessage: ''
                })
            }
            else {

                return Object.assign({}, state, {
                    viewBookingDataErrorMessage: action.payload.error
                })
            }
        case actionTypes.log_out:
            return Object.assign({}, state, {
                contactNumber: "",
                userId: "",
                userName: "",
                loadHome: false,
                errorMessage: "",
                successMessage: "",
                registerEmail: false,
                emailId: "",
                name: "",
                emailErrorMessage: '',
                goToLogin: false,
                hotdealsErrorMessage: '',
                hotdeals: [],
                destination: [],
                destinationErrorMessage: [],
                bookingData: '',
                newBookingId: '',
                showBookId: true,
                bookIdErrorMessage: '',
                viewBookingDataErrorMessage: '',
                viewBookingData: ""

            })


        default:
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    hotdeals: hotDealReducer
});
export default rootReducer
