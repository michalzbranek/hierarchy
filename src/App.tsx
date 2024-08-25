import "./App.css";
import { useState } from "react";
import TableComponent from "./TableComponent";
const res = await fetch("./data.json");
const jsonData = await res.json();

function App() {
  const [datas, setDatas] = useState(jsonData);

  // const show = (index: number) => {
  //   setData((prevRows) => {
  //     return prevRows.map((row) => ({
  //       ...row,
  //       show: row.children.uuid === index ? !row.show : row.show,
  //     }));
  //   });
  // };

  const handleDelete = (id: number) => {
    setDatas((prevDatas: any) => {
      return prevDatas.filter((data: any) => data.data.ID !== id);
    });
  };

  return (
    <>
      {datas.map((data: any) => (
        <TableComponent
          key={data.data.ID}
          data={data}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default App;
