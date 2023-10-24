export default defineEventHandler(async (event) => {
  //   event.node.req;

  const body = await readBody(event);
  return {
    api: "xxxxxxxx",

    b: body,
  };
});
