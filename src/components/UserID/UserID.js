import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: red;
`;

const DataContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: blue;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: black;
`;

class UserID extends React.Component {

    constructor() {
        super();
        this.state = {
            searchid: window.location.pathname,
            user: null,
            name: null,
            username: null,
            date: null,
            id: null,
            status: null,
            token: null,
            editing: false,
            birthdate: null,
            newbirthdate: null,
            newusername: null,
        };

        //Not the most ideal way of handling the page's individualization, but it works i guess
        let tempid = "";
        let i;
        let happend = 0;
        for(i=0;i<this.state.searchid.length;i++){
            if(happend === 2){
                tempid += this.state.searchid[i];
            }
            if(this.state.searchid[i] === "/"){
                happend += 1;
            }
        }
        this.state.searchid = tempid;

        this.getUser();
    }

    async getUser(){
        try {
            let userId = this.state.searchid;
            const response = await api.get('/users/'+userId);
            this.setState({user: response.data});
            this.setState({username: this.state.user.username});
            this.setState({newusername: this.state.user.username});
            this.setState({status: this.state.user.status});
            this.setState({date: this.state.user.date});
            this.setState({id: this.state.user.id});
            this.setState({birthdate: this.state.user.birthdate});
            this.setState({newbirthdate: this.state.user.birthdate});
            this.setState({token: this.state.user.token});
        } catch (error) {
            alert(`Something went wrong while fetching the profile: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async goBack(){
        this.props.history.push("/game");
    }

    async tryEdit(){
        //Write the temporary birthdate into the persistent one
        this.setState({birthdate: this.state.newbirthdate});
        this.setState({username: this.state.newusername});

        //Call the server to change the birthdate in the backend
        let userId = this.state.id;
        const response = await api.put('/users/'+userId, this.state.newbirthdate + "!!!" + this.state.newusername);

        //Success message
        alert("Your profile was successfully updated!");
    }


    render() {
        return (
            <FormContainer>
                <h1>Welcome to the Profile of User Nr. {this.state.id}!</h1>
                <DataContainer>
                Username: {this.state.username}
                </DataContainer>
                <DataContainer>
                Online Status: {this.state.status}
            </DataContainer>
            <DataContainer>
                Creation Date: {this.state.date}
            </DataContainer>
                <DataContainer>
                    Birthdate: {this.state.birthdate}
                    <ButtonContainer>
                        <InputField
                            placeholder="New Username"
                            onChange={e => {
                                this.handleInputChange('newusername', e.target.value);
                            }}
                        />
                    </ButtonContainer>
                    <ButtonContainer>
                        <InputField
                            placeholder="New Birthday"
                            onChange={e => {
                                this.handleInputChange('newbirthdate', e.target.value);
                            }}
                        />
                    </ButtonContainer>
                    <Button disabled={localStorage.getItem('token') !== this.state.token} onClick={()=>{this.tryEdit()}}>
                        Save / Update
                    </Button>
                </DataContainer>
                <ButtonContainer>
                    <Button onClick={() => {this.goBack()}}>
                        Return
                    </Button>
                </ButtonContainer>
            </FormContainer>
        )
    }
}
export default withRouter(UserID);
