import { List } from "./top.get";

export default defineEventHandler(async (event) => {
  const { listId, trackId } = await readBody(event);

  try {
    const list = await List.findById({ _id: listId });

    if (!list?.trackIds?.includes(trackId)) {
      list?.trackIds?.push(trackId);
      list?.save();
      return {
        status: 200,
        message: "Track added to list",
      };
    }
    return {
      status: 200,
      message: "Track already in list",
    };
  } catch (err) {
    return {
      status: 500,
      message: "Error adding track to list, please try again later",
    };
  }
});
