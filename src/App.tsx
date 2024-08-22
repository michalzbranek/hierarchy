import "./App.css";
import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import { v4 as uuid } from "uuid";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);

  const removeRow = (index: number) => {
    setData((prevRows) => {
      return prevRows.filter((row) => row.uuid !== index);
    });
  };

  useEffect(() => {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const result = data.map((o: any) => ({
          ...o,
          uuid: uuid(),
        }));
        setData(result);
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
      <TableComponent data={data} headers={headers} remove={removeRow} />
    </>
  );
}

export default App;
