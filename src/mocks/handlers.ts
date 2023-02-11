import { rest } from 'msw';
import names from './names.json';

export const handlers = [
  rest.get('/api/names', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(names)
    )
  }),
];
