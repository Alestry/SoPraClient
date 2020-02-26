import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class UserID extends React.Component {

    constructor() {
        super();
        this.state = {
            id: window.location.pathname,
            user: null,
        };

        //Not the most ideal way of handling the page's individualization, but it works i guess
        let tempid = "";
        let i;
        let happend = 0;
        for(i=0;i<this.state.id.length;i++){
            if(happend === 2){
                tempid += this.state.id[i];
            }
            if(this.state.id[i] === "/"){
                happend += 1;
            }
        }
        this.state.id = tempid;

        this.getUser();
    }

    async getUser(){
        try {
            const sentID = JSON.stringify(this.state.id)
            const response = await api.get("/profile");
            this.setState({user: response.data});
        } catch (error) {
            alert(`Something went wrong while fetching the profile: \n${handleError(error)}`);
        }
    }

    async goBack(){
        this.props.history.push("/game");
    }

    render() {
        return (
            <FormContainer>
                <h1>Welcome to Profile of User Nr. {this.state.id}!</h1>
                <ButtonContainer>
                    <Button onClick={() => {this.goBack()}}>
                        Return
                    </Button>
                </ButtonContainer>
                {this.state.user}
            </FormContainer>
        )
    }
}
export default withRouter(UserID);
