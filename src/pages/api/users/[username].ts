import type { NextApiRequest, NextApiResponse } from 'next';
import { gitHubService } from '../../../services/GithubService/GithubService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;

  try {
    const response = await gitHubService.getUser(username as string);

    res
      .status(200)
      .json({
        avatarUrl: response.data.user.avatarUrl,
        name: response.data.user.name,
        login: response.data.user.login,
      });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Unable to retrieve user\'s data' });
  }
};
