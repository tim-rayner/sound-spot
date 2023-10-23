//import { sendError } from "h3";

export default defineEventHandler((event: any) => {
  //   const clientSideRoutes = !event.url.startsWith("/api");
  //   if (clientSideRoutes) {
  //     return;
  //   } else if (!event.req.headers.authorization) {
  //     sendError(event, new Error("Unathorized"));
  //   }
  //   event.context.auth = {
  //     authenticated: true,
  //     user: event.req.user,
  //   };
});
