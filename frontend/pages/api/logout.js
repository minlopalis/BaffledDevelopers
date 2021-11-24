import { destroyCookie } from 'nookies';

export default async (req, res) => {
  destroyCookie({ res }, 'jwt', {
    path: '/',
  });

  res.status(200).end();
};
