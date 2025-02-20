import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  variables:{
    userId : string
  }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    // const token = authHeader?.split(" ")[1]
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("userId" , user.id);
    } else{
        c.status(403);
        return c.json({
        message : "You are not logged in"       
    })
    }
  next();
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  const blog = await prisma.User.create({
    data: {
      title: body.title,
      content: body.content,
      authorId : Number(authorId)
    },
  });
  return c.json({
    id: blog.id,
  });
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.Blog.update({
    where: {
      id: body.id,
    },
    data: {
      titile: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  }); 
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    databaseUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = c.req.json();
  try {
    const blog = await prisma.Blog.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "error finding blog post",
    });
  }
});


// try doing pagination here
blogRouter.get("/bluk", async (c) => {
    const prisma = new PrismaClient({
        databaseUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.Blog.findMany();
    return c.json({
        blogs
    })
});
