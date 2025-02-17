// import { Router } from "hono/router"
// export const router = Router();

import { Hono } from "hono";

export const nextRouter = new Hono();

nextRouter.post('/user/signup/', (c) => {
  return c.text('get user bro')
})

nextRouter.post("/user/signin/", (c) =>{
  return c.text('gw');
})
nextRouter.post("/blog", (c)=>{
  return c.text("asdf")
})
nextRouter.put("api/v1/blog", (c=>{
    return c.text("");
}))
nextRouter.get('/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
nextRouter.get('/blog/bluk', (c) => {
  return c.text('Hello Hono!')
})

