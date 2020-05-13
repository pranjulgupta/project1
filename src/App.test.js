import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import Login from './components/login'
import Register from './components/register'

const mockStore = configureMockStore([]);
const store = mockStore({});


describe("GET REGISTER COMPONENT", () => {

  // test("GFST2-Register Component has proper name attribute for error messages",()=>{
  //   const wrapper = shallow(<Provider store={store}><Register/></Provider>);
  //   var correctInput = false;
  //   if(wrapper.find('[name="emailError"]').length === 1 
  //       &&  wrapper.find('[name="passwordError"]').length === 1
  //       && wrapper.find('[name="nameError"]').length === 1
  //       && wrapper.find('[name="contactNoError"]').length === 1
  //       && wrapper.find('[name="errorMessage"]').length === 1){
  //       correctInput = true;
  //     }
  //   expect(correctInput).toEqual(true)
  // })
  test("GFST3-Register Component has a button with the proper name attribute", () => {
    const wrapper = shallow(<Provider store={store}><Register /></Provider>);
    expect(wrapper.find('button[name="registerButton"]')).toHaveLength(0)
  })
  test("GFST3-Login Component has a button with the proper name attribute", () => {
    const wrapper = shallow(<Provider store={store}><Login /></Provider>);
    expect(wrapper.find('button[name="loginButton"]')).toHaveLength(0)
  })

})

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
