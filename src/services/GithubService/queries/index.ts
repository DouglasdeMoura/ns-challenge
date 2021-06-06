import { gql } from '@apollo/client';

export const GET_USER_BY_LOGIN = gql`
  query GetUserByLogin($username: String!) { 
    user(login: $username) {
      avatarUrl
      name 
      login
    }
  }
`;
