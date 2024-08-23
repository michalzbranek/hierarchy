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

  const show = (index: number) => {
    setData((prevRows) => {
      return prevRows.map((row) => {});
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
          data: o.data,
          children: { show: false, uuid: uuid(), data: o.children },
          uuid: uuid(),
        }));
        setData(result);
        // console.log(result[0].children.data.has_nemesis.records[0].data);
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
      <TableComponent
        data={data}
        headers={headers}
        remove={removeRow}
        show={show}
      />
    </>
  );
}

export default App;
