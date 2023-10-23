/*We could avoid the method checking in the route event handler
    if we suffix the route file name with .get, .post, .put and .put 
    methods like:
    ~/server/api/blogs/index.get.js, 
    ~/server/api/blogs/index.post.js, 
    ~/server/api/blogs/[id].put.js and 
    ~/server/api/blogs/index.delete.js 
    respectively.
*/
import { Schema, model } from "mongoose";

//define user schema
const blogSchema = new Schema({
  name: String,
});

//define user model
export const Blog = model<any>("Blog", blogSchema);

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    // return blogs list;
    const blogs = await Blog.find();
    return blogs;
  }
  if (event.method === "POST") {
    // create a blog
    // return the blog;
  }
});
