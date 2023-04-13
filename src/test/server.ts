import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { LoginResponseType } from 'types/response';

interface HandlerConfig {
  method?: 'get' | 'post' | 'put' | 'delete';
  path: string;
  res: (req: any, res: any, ctx: any) => LoginResponseType;
}

export function createServer(handlerConfig: HandlerConfig[]) {
  const handlers = handlerConfig.map((config) => rest[config.method || 'get'](config.path, (req, res, ctx) => res(ctx.json(config.res(req, res, ctx)))));
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}
