import "./App.css";
import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import { v4 as uuid } from "uuid";
import { produce } from "immer";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);

  const removeCh = (rowNumber: number, recordNumber: number) => {
    const deletedChildrenArray = produce(data, (draft: any) => {
      draft[rowNumber].children.data.has_nemesis.records.splice(
        recordNumber,
        1
      );
    });

    if (
      deletedChildrenArray[rowNumber].children.data.has_nemesis.records
        .length == 0
    ) {
      const fixedLength = produce(data, (draft: any) => {
        draft[rowNumber].children.data = {};
      });
      setData(fixedLength);
    } else {
      setData(deletedChildrenArray);
    }
  };

  const removeRow = (index: number) => {
    setData((prevRows) => {
      return prevRows.filter((row) => row.uuid !== index);
    });
  };

  const show = (index: number) => {
    setData((prevRows) => {
      return prevRows.map((row) => ({
        ...row,
        show: row.children.uuid === index ? !row.show : row.show,
      }));
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
          children: { uuid: uuid(), data: o.children },
          uuid: uuid(),
          show: false,
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
      <TableComponent
        data={data}
        headers={headers}
        remove={removeRow}
        show={show}
        removeChildren={removeCh}
      />
    </>
  );
}

export default App;
