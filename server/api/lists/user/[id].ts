import { defineEventHandler } from "h3";

import type { List as iList } from "~/types/list-types";
import { List } from "../top.get";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  // Grab the parameter from the route

  const userId = getRouterParam(event, "id");

  const lists: iList[] = await List.find({ owner: userId });

  return lists;
});
