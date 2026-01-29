import { Hono } from "hono";
import { sayHello } from "./domain/sayHello";

const app = new Hono();

app.get("/", (c) => {
  const message = sayHello("World");
  return c.text(message);
});

export default app;
