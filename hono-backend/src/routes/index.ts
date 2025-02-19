import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'

const privateKey = "Sivaji vaai la jilebi"
export const nextRouter = new Hono<{
       Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
       } 
      }>();

nextRouter.post("/user/signup/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const body = await c.req.json();
  await prisma.user.create({
    data : {
      email : body.email,
      password : body.password,
    }
  })
  // @ts-ignore
  const token = sign({ id : user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt : token
  });
});

nextRouter.post("/user/signin/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique(
    {
      where : {
        email : body.email,
        password : body.password
      }
    }
    );
  if(!user){
    return c.json({
   message : "User not found"   
  })
  }
  const token = await sign({ id : user.id }, c.env.JWT_SECRET);
  return c.json({
    token 
  })
});


nextRouter.post("/blog", (c) => {
  return c.text("asdf");
});
nextRouter.put("api/v1/blog", (c) => {
  return c.text("");
});
nextRouter.get("/blog/:id", (c) => {
  return c.text("Hello Hono!");
});
nextRouter.get("/blog/bluk", (c) => {
  return c.text("Hello Hono!");
});
