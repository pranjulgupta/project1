import * as actionTypes from "./type";
import ApiCall from '../apiCall/index';
// import {printHelper} from '../apiCall/index'

export const viewBookingData=(userId)=>{
    return function(dispatch){
        return ApiCall('Get','view_booking',userId).then((data) =>{
            dispatch({
                type:actionTypes.view_booking,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.view_booking,
                payload:error
        })
        })
    }
}
export const confirmCancle=(bookingId,userId)=>{
    return function(dispatch){
        return ApiCall('Put',bookingId,userId).then((data) =>{
            dispatch({
                type:actionTypes.cancel_booking,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.cancel_booking,
                payload:error
        })
        })
    }
}



export const bookPackage=(bookData)=>{
    return function(dispatch){
        return ApiCall('Post',bookData,'book_package').then((data) =>{
            dispatch({
                type:actionTypes.book_package,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.book_package,
                payload:error
                
        })
        })
    }
}

export const getHotDeals=()=>{
    return function(dispatch){
        return ApiCall('Get','get_hotDeal').then((data) =>{
            dispatch({
                type:actionTypes.hot_deals,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.hot_deals,
                payload:error
        })
        })
    }
}

// export const printTicket=(data)=>{
//     printHelper(data)
// }


export const getDestinationData=()=>{
    return function(dispatch){
        return ApiCall('Get','destination_data').then((data) =>{
            dispatch({
                type:actionTypes.get_destination,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.get_destination,
                payload:error
                
        })
        })
    }
}



export const registerUser=(logInForm)=>{
    return function(dispatch){
        return ApiCall('Post',logInForm,'register_user').then((data) =>{
            dispatch({
                type:actionTypes.register_user,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.register_user,
                payload:error
                
        })
        })
    }
}


export const loginByMobile=(logInForm)=>{
    return function(dispatch){
        return ApiCall('Post',logInForm,"log_in").then((data) =>{
            dispatch({
                type:actionTypes.logIn_Mobile,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.logIn_Mobile,
                payload:error
                
        })
        })
    }
}

export const checkUser=(email,name)=>{
    return function(dispatch){
        return ApiCall('Post',email,"check_user").then((data) =>{
            dispatch({
                type:actionTypes.check_user,
                payload:data
            })
        }).catch((error)=>{
            dispatch({
                type:actionTypes.check_user,
                payload:{email,name}
                
        })
        })
    }
}



export const logOut = () => {
    return {
        type: actionTypes.log_out
    };
};

export const setbookData = (bookData) => {
    return {
        type: actionTypes.set_bookData,
        payload:bookData
        
    }
}