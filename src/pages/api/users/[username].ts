import type { NextApiRequest, NextApiResponse } from 'next';
import corsFn from 'cors';

import { gitHubService } from '../../../services/GithubService/GithubService';
import { initMiddleware } from '../../../helpers/initMiddleware';

const cors = initMiddleware(corsFn({ methods: ['GET'] }));

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

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
    const statusCode = error.type === 'NOT_FOUND' ? 404 : 500;

    res
      .status(statusCode)
      .json({ message: error.message });
  }
};
