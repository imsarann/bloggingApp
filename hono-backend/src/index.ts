import { Hono } from 'hono'
import { nextRouter } from './routes'

const app = new Hono<{
    Bindings : {
        DATABASE_URL : string,
    }
  }>()
app.route('api/v1/', nextRouter);


export default app
