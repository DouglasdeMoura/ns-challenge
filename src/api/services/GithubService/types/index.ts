type Organization = {
  name: string,
  avatarUrl: string,
  url: string,
}

type TopRepositories = {
  name: string,
  description: string,
  primary: {
    name: string,
  },
  stargazerCount: number,
  forkCount: number,
}

export type QueriedUserData = {
  avatarUrl: string,
  name: string,
  login: string,
  followers: {
    totalCount: number,
  },
  following: {
    totalCount: number,
  },
  starredRepositories: {
    totalCount: number,
  },
  twitterUsername: string,
  organizations: {
    nodes: Organization[]
  },
  topRepositories: {
    nodes: TopRepositories[]
  }
};

export type UserData = {
  avatarUrl: string,
  name: string,
  login: string,
  followers: number,
  following: number,
  starredRepositories: number,
  twitterUsername: string,
  organizations: Organization[],
  topRepositories: TopRepositories[],
}

export type UserDataResponse = { user: QueriedUserData };
