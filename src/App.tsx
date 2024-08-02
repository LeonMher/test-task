import "./index.css";
import { getAuthorsRequest } from "./api/authors/getAuthorsRequest";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    getAuthorsRequest().then((data) => console.log(data));
  }, []);
  return (
    <>
      <h1>Test Task</h1>
    </>
  );
}

export default App;
