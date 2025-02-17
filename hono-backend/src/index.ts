import { Hono } from 'hono'
import { nextRouter } from './routes'

const app = new Hono()
// postgresql://neondb_owner:npg_JfWZ1OQNdmv3@ep-raspy-credit-a80zme5b-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
app.route('api/v1/', nextRouter);


export default app
