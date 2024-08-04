import axios from "axios";

import MockAdapter from "axios-mock-adapter";
import { commentsPage1 } from "../../data/comments";

export const getCommentsRequest = async () => {
  var mock = new MockAdapter(axios);
  mock.onGet("/api/comments").reply(200, {
    // TODO: rename users to comments
    users: commentsPage1,
  });
  const { data } = await axios.get("/api/comments");
  return data;
};

export default getCommentsRequest;
