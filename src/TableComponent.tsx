import { useState } from "react";

function TableComponent({ data, handleDelete }: any) {
  console.log(data);
  const [show, setShow] = useState(false);
  const [subDatas, setSubDatas] = useState<JsonDatabase>(data.children);

  console.log("subDatas", subDatas);
  const handleSubTodoDelete = (uuid: string) => {
    setSubDatas((prevDatas: JsonDatabase) =>
      prevDatas.filter(({ data }: DatabaseRecord) => data.uuid !== uuid)
    );
  };

  const showHide = () => {
    setShow(!show);
  };

  return (
    <table>
      <thead>
        <tr>
          <td>children</td>
          {Object.keys(data.data).map((header: string, index: number) => {
            return header !== "uuid" && <td key={index}>{header}</td>;
          })}
          <td>delete</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(data.children).length !== 0 && subDatas.length !== 0 ? (
            <td id="children" onClick={showHide}></td>
          ) : (
            <td></td>
          )}
          {Object.keys(data.data).map((header: string, index: number) => {
            return (
              header !== "uuid" && <td key={index}>{data.data[header]}</td>
            );
          })}
          <td id="delete" onClick={() => handleDelete(data.data.uuid)}></td>
        </tr>
        <tr>
          <td>
            {show && Object.keys(subDatas).length !== 0 &&
              subDatas.map((data: DatabaseRecord) => (
                <TableComponent
                  key={data.data.uuid}
                  data={data}
                  handleDelete={handleSubTodoDelete}
                />
              ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableComponent;
