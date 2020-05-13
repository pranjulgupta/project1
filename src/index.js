import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App';
// import registerServiceWorker from "./registerServiceWorker";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect,withRouter } from "react-router-dom";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import Login from './components/login';
import Home from './components/home';
import StaticPackage from './components/static-packages';
import Register from './components/register';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "bootstrap/dist/css/bootstrap.css";
import { createStore,applyMiddleware } from 'redux'
import {logOut} from './actions/index'

import thunk from "redux-thunk";
import { Provider, connect } from 'react-redux';
import rootReducer from "./reducers"
import registerServiceWorker from './registerServiceWorker';
import HotDeals from './components/hotdeals';

import BookPackage from './components/bookPackage';
import ViewBooking from './components/viewBooking';
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  ));
// const store = createStore(rootReducer,applyMiddleware(thunk));
class Root extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                  logged_userId: "",
                  logged_userName: "",
                  dialog_visible: false,
                  logged_out: false
                }
              }
            
              onClick = (event) => {
                this.setState({ dialog_visible: true })
              }
            componentDidMount(){
              this.setState({logged_userId:sessionStorage.getItem('userId'),logged_userName:sessionStorage.getItem('userName')})
            }
            
              onHide = (event) => {
                this.setState({ dialog_visible: false });
              }
            
              logout = () => {
                sessionStorage.clear();
                this.props.logOut()
                this.props.history.push('/')
                this.setState({ logged_out: true ,dialog_visible: false,logged_userId:'',logged_userName:'' });
                // window.location.reload();
              }
            
              confirm_logout = () => {
                this.setState({ dialog_visible: true });
              }
            
              render() {
                const footer = (
                  <div>
                    <Button label="CONTINUE EXPLORING" icon="pi pi-check" onClick={this.onHide} />
                    <Button label="LOGOUT" icon="pi pi-times" onClick={this.logout} className="p-button-secondary" />
                  </div>
                );
                
                // if (this.state.logged_out === true) {
                //   return <Redirect to={'/'} />
                // }
                return (
                  <div>
                    <Router>
                      <div className="App">
                        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                          <div className="navbar-header">
                            <Link className="navbar-brand" to="/">Start Wandering</Link>
                          </div>
                          <ul className="navbar-nav ml-auto">
                            {this.props.user.userId || this.state.logged_userId ? <li className="nav-item">
                              <Link className="nav-link" to="">Welcome {this.props.user.userName||this.state.logged_userName}</Link>
                            </li> : null}
                            <li className="nav-item">
                              <Link className="nav-link" to="/packages">Hot Deals </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/viewBookings">Planned Trips</Link>
                            </li>
                            {/* {!this.props.user.userId  ?
                              <li className="nav-item">
                                <Link className="nav-link" to="/login"> Login</Link>
                              </li> : null} */}
                            {this.props.user.userId || this.state.logged_userId ?
                              <li className="nav-item">
                                <button className="nav-link btn btn-secondary" onClick={this.confirm_logout}>Logout</button>
                              </li> : <li className="nav-item">
                                <Link className="nav-link" to="/login"> Login</Link>
                              </li> }
                          </ul>
                        </nav>
                        {/* {this.state.logged_out ? <Redirect to="/" /> : null} */}
                        <div className="content-section implementation">
                          <Dialog
                            header="Confirmation"
                            visible={this.state.dialog_visible}
                            style={{ width: '50vw' }}
                            footer={footer}
                            onHide={this.onHide}
                            maximizable
                          >
                            Are you sure you want to logout?
                        </Dialog>
                        </div>
                        <Switch>
                          <Route exact path="/" component={Home}></Route>
                          <Route exact path="/login" component={Login}></Route>
                          <Route exact path="/home/:userId" component={Home}></Route>
                          <Route exact path="/packages" component={HotDeals}></Route>{/* Only HotDeals*/}
                          <Route exact path="/packages/:continent" component={HotDeals}></Route>{/* Destinations with search*/}
                          <Route exact path="/book/:destId" component={BookPackage}></Route>
                          <Route exact path="/viewBookings" component={ViewBooking}></Route>
                          <Route exact path="/register" component={Register}></Route>
                          <Route path="*" render={() => <Redirect to="/login" />}></Route>
                        </Switch>
                      </div>
                    </Router>
                    <footer className="bg-black text-center text-white-50">
                      Copyright &copy; www.eta.wanderlust.com 2018
                </footer>
                  </div>
             
        );
    }
}
const mapStateFromProps = state => ({
    user: state.user
});
const RootWithAuth = withRouter(connect(mapStateFromProps,{logOut})(Root));
ReactDOM.render(
    <Provider store={store}>
        <Router><RootWithAuth /></Router>
    </Provider>, document.getElementById('root'));

registerServiceWorker();

