import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { showFlight } from '../actions/index';
import { connect } from 'react-redux';
import axios from 'axios'
import { backendUrlUser, backendUrlPackage, backendUrlBooking } from '../BackendURL';
import GenPrint from '../components/Primecomponent/GenPrint'
const ApiCall = (method, data1, data2) => {
   if (data1 && data2 == 'check_user') {
      return axios.post(backendUrlUser + '/checkUser', data1).then((response) => {
         return response.data
      }).catch((error) => {
         return { error: error.response.data.message }
      })
   }
   else {
      if (data2 == 'register_user') {
         return axios.post(backendUrlUser + '/register', data1).then((response) => {
            return response.data
         }).catch((error) => {
            return { error: error.response.data.message }
         })
      }
      else {
         if (data2 == 'book_package') {
            return axios.post(backendUrlBooking + '/booking', data1).then((response) => {
               return response.data
            }).catch((error) => {
               return { error: error.response.data.message }
            })
         }
         else {
            if (method == 'Get' && data1 == 'get_hotDeal') {
               return axios.get(backendUrlPackage + '/hotDeals').then(response => {
                  return response.data
               }).catch(error => {
                  return { error: error.response.data.message }
               })
            }
            else {
               if (method == 'Get' && data1 == 'destination_data') {
                  return axios.get(backendUrlPackage + '/destination').then(response => {
                     return response.data
                  }).catch(error => {
                     return { error: error.response.data.message }
                  })
               }
               else {
                  if (method == 'Get' && data1 == 'view_booking') {
                     return axios.get(backendUrlBooking + '/viewBooking/' + data2).then(response => {
                        return response.data
                     }).catch(error => {
                        return { error: error.response.data.message }
                     })
                  }
                  else {
                     if (method == 'Put') {
                        return axios.put(backendUrlBooking + '/cancleBooking/' + data1 + "/" + data2).then(response => {
                           return response.data
                        }).catch(error => {
                           return { error: error.response.data.message }
                        })
                     }
                     else {
                        return axios.post(backendUrlUser + '/login', data1).then((response) => {
                           return response.data
                        }).catch((error) => {
                           return { error: error.response.data.message }
                        })
                     }
                  }
               }

            }
         }
      }
   }
}


export default ApiCall

// export const printHelper = (data) => {
//    document.getElementById('print-container').innerHTML = ''
//    ReactDOM.render(<GenPrint data={data} />, document.getElementById('root'))
//  }

