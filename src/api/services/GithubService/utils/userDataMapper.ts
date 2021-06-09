import { UserData, UserDataResponse } from '../types';

export function userDataMapper(userDataResponse: UserDataResponse) {
  const {
    user: {
      name,
      login,
      followers,
      following,
      organizations,
      starredRepositories,
      topRepositories,
      twitterUsername,
      avatarUrl,
    },
  } = userDataResponse;

  const userData: UserData = {
    name,
    login,
    followers: followers.totalCount,
    following: following.totalCount,
    organizations: organizations.nodes.map((item) => ({
      name: item.name,
      avatarUrl: item.avatarUrl,
      url: item.url,
    })),
    starredRepositories: starredRepositories.totalCount,
    topRepositories: topRepositories.nodes.map((item) => ({
      name: item.name,
      url: item.url,
      primaryLanguage: item.primaryLanguage,
      description: item.description,
      forkCount: item.forkCount,
      stargazerCount: item.stargazerCount,
    })),
    twitterUsername,
    avatarUrl,
  };

  return userData;
}
