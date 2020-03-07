import React from "react";
import styled from "styled-components";


const Container = styled.div`
  margin: 6px 0;
  width: 400px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  background-color: #102387;
  `;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  color: white;
`;

const Name = styled.div`
  font-weight: bold;
  color: #66aaaa;
`;

const Id = styled.div`
  margin-left: 30px;
  margin-right: auto;
  font-weight: bold;
  color: yellow;
`;

const Date = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-size: 12px
  color: pink;
  font-weight: bold;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = ({ user }) => {
  return (
    <Container>
        <Name>{user.name}</Name> <UserName>{user.username}</UserName>
        <Id>Id: {user.id}</Id>
        <Date>Created: {user.date}</Date>
    </Container>
  );
};

export default Player;