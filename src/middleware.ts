export { default } from 'next-auth/middleware';

export const config = { matcher: ["/pages/todo", "/pages/todo[id]", "/pages/where"] }