import "./App.css";
import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
const res = await fetch("./data.json");
const jsonData = await res.json();
import { v4 as uuid } from "uuid";

function App() {
  const handleIds = (json: any) => {
    json.map((jsonField: any) => {
      jsonField.data.uuid = uuid();
      // jsonField.data.show = false;
      jsonField.children.hasOwnProperty("has_nemesis")
        ? handleIds(jsonField.children.has_nemesis.records)
        : jsonField.children.hasOwnProperty("has_secrete") &&
          handleIds(jsonField.children.has_secrete.records);
    });
    return json;
  };

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(handleIds(jsonData));
  }, []);

  // const show = (index: number) => {
  //   setData((prevRows) => {
  //     return prevRows.map((row) => ({
  //       ...row,
  //       show: row.children.uuid === index ? !row.show : row.show,
  //     }));
  //   });
  // };

  const handleDelete = (uuid: number) => {
    setDatas((prevDatas: any) => {
      return prevDatas.filter((data: any) => data.data.uuid !== uuid);
    });
  };

  return (
    <>
      {datas.map((data: any) => (
        <TableComponent
          key={data.data.uuid}
          data={data}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default App;
