export { default } from "next-auth/middleware";

export const config = { matcher: ["/recipes/create", "/ingredients/create", "/tools/create"] };