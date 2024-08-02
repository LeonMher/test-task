import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import authors from "../../data/authors";

export const getAuthorsRequest = async () => {
  var mock = new MockAdapter(axios);
  mock.onGet("/api/authors").reply(200, {
    users: authors,
  });
  const { data } = await axios.get("/api/authors");
  return data;
};
