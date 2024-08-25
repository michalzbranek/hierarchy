import { useState } from "react";

function TableComponent({ data, handleDelete }: any) {
  const [subDatas, setSubDatas] = useState(
    data.children.hasOwnProperty("has_nemesis")
      ? data.children.has_nemesis.records
      : data.children.hasOwnProperty("has_secrete")
      ? data.children.has_secrete.records
      : []
  );

  const handleSubTodoDelete = (id: number) => {
    setSubDatas((prevSubDatas: any) => {
      return prevSubDatas.filter((data: any) => data.data.ID !== id);
    });
  };

  // const showHide = (index: number) => {
  //   show(index);
  // };

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          {Object.keys(data.data).map((header: any, index: number) => {
            return <td key={index}>{header}</td>;
          })}
          <td>delete</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(data.children).length !== 0 ? (
            <td>
              <button id="children">children</button>
            </td>
          ) : (
            <td></td>
          )}
          {Object.keys(data.data).map((header: any, index: number) => {
            return <td key={index}>{data.data[header]}</td>;
          })}
          <td>
            <button id="delete" onClick={() => handleDelete(data.data.ID)}>
              X
            </button>
          </td>
        </tr>
        <tr>
          <td>
            {subDatas.map((data: any) => (
              <TableComponent
                key={data.data.ID}
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
