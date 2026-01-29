import { describe, it, expect } from "vitest";
import { sayHello } from "./sayHello.js";

describe(`sayHello`, () => {
  it("should return hello message", () => {
    expect(sayHello("World")).toBe("Hello, World!");
  });
});
