import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: #cc0033;
  text-align: right;
  font-size: 20px;
`;

const Users = styled.ul`
  list-style: none;
  padding-right: 20;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    &:hover {
    transform: translateX(-50px);
  }
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
    };
  }

  async logout() {
    await api.get('/logout/' + localStorage.getItem('token'));
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)

      /*await new Promise(resolve => setTimeout(resolve, 1000));*/

      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  /**This function redirects the user to the selected user's profile when it was clicked.
   *
   * @param user
   */
  async redirectToUser(user){
    try{
      this.props.history.push(`/users/`+ user.id);

    }catch(error){
      alert(`Something went wrong during the inspection of a profile: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <Container>
        <h2>You are now logged in.</h2>
        <p>Here is the list of registered users:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer onClick = {()=>{
                    this.redirectToUser(user);
                  }} key={user.id}>
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout()
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
