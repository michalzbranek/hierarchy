import { useState } from "react";

function TableComponent({ data, handleDelete }: any) {
  // let show = false;
  // const [show, setShow] = useState(false);
  const [subDatas, setSubDatas] = useState(
    data.children.hasOwnProperty("has_nemesis")
      ? data.children.has_nemesis.records
      : data.children.hasOwnProperty("has_secrete")
      ? data.children.has_secrete.records
      : []
  );

  const handleSubTodoDelete = (uuid: number) => {
    setSubDatas((prevSubDatas: any) => {
      return prevSubDatas.filter((data: any) => data.data.uuid !== uuid);
    });
  };

  // const showHide = () => {
  //   setShow(true);
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
            <button id="delete" onClick={() => handleDelete(data.data.uuid)}>
              X
            </button>
          </td>
        </tr>
        <tr>
          <td>
            {subDatas.map((data: any) => (
              <TableComponent
                key={data.data.uuid}
                data={data}
                handleDelete={handleSubTodoDelete}
                // handleShow={show}
              />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableComponent;
