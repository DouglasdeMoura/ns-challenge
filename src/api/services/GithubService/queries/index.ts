import { gql } from '@apollo/client';

export const GET_USER_DATA_BY_LOGIN = gql`
  query GetUserByLogin($username: String!) { 
    user(login: $username) {
      avatarUrl
      name 
      login
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      twitterUsername
      organizations(first: 10) {
        nodes {
          name
          avatarUrl
          url
        }
      }
      topRepositories(first: 6, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          name
          description
          primaryLanguage {
            name
          }
          stargazerCount
          forkCount
        }
      }
    }
  }
`;
