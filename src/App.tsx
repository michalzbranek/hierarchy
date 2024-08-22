import "./App.css";
import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";

function App() {
  const [data, setData] = useState(null);
  const [headers, setHeaders] = useState<any[]>([]);

  useEffect(() => {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setHeaders(Object.keys(data[0]["data"]));
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, []);

  return (
    <>
      <TableComponent data={data} headers={headers} />
    </>
  );
}

export default App;
