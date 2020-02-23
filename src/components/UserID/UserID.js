import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

class UserID extends React.Component {

    render() {
        return (
            <h2>Hello</h2>
        )
    }
}
export default withRouter(UserID);