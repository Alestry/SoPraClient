import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 130px;
  background: linear-gradient(rgb(68,93,67), rgb(167,32,78));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(0,0,0);
    font-weight: bold;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.6);
  color: black;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      date: "",
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  //Original login function renamed to register
  async register() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        date: this.state.date,
      });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Registration successfully worked --> Display message to log in.
      alert("Registration complete. Now you can log in with your new account.")

      //this.props.history.push(`/login`);

    } catch (error) {
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
  }

  //New login function with new functionality
  async login(){
    try{
      const requestBody = JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        date: this.state.date,
      });
      const response = await api.put('/login', requestBody);

      //Storing Token
      localStorage.setItem('token', response.data.token);

      //Navigate to the route /game in the GameRouter
      this.props.history.push(`/game`);

    }
     catch(error){
      alert(`Something went wrong during the login (This Username/Name combination does not exist): \n${handleError(error)}`);
    }
  }

  setDate(){
    let today = new Date();
    let day = String(today.getDate()).padStart(2,'0');
    let month = String(today.getMonth()+1).padStart(2,'0');
    let year = today.getFullYear();
    const todayString = day+"/"+month+"/"+year;
    this.state.date = todayString;
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Name</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('name', e.target.value);
              }}
            />

            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.name}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                  disabled={!this.state.username || !this.state.name}
                  width="50%"
                  onClick={() => {
                    this.setDate();
                    this.register();
                  }}
              >
                Register
              </Button>
            </ButtonContainer>

          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
