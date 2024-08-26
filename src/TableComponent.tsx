import { useState } from "react";

function TableComponent({ data, handleDelete }: any) {
  const [show, setShow] = useState(false);
  const [subDatas, setSubDatas] = useState(
    data.children.hasOwnProperty("has_nemesis")
      ? data.children.has_nemesis.records
      : data.children.hasOwnProperty("has_secrete")
      ? data.children.has_secrete.records
      : []
  );

  // console.log(data);
  // console.log(handleShow);

  const handleSubTodoDelete = (uuid: number) => {
    setSubDatas((prevSubDatas: any) => {
      return prevSubDatas.filter((data: any) => data.data.uuid !== uuid);
    });
  };

  // const show = () => {
  //   setSubDatas((prevRows: any) => {
  //     return prevRows.map((row: any) => ({
  //       ...row,
  //       show: !row.show,
  //     }));
  //   });
  // };

  const showHide = () => {
    // setSubDatas((prevSubDatas: any) => {
    //   return prevSubDatas.map(
    //     (subData: any) => ({
    //       ...subData,
    //       show: !subData.show,
    //     })
    //     console.log(subData)
    //   );
    // });
    setShow(!show);
    // console.log(subDatas[0].data.ID + ": " + subDatas[0].show);
  };

  return (
    <table>
      <thead>
        <tr>
          <td>children</td>
          {Object.keys(data.data).map((header: any, index: number) => {
            return header !== "uuid" && <td key={index}>{header}</td>;
          })}
          <td>delete</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(data.children).length !== 0 ? (
            <td id="children" onClick={showHide}></td>
          ) : (
            <td></td>
          )}
          {Object.keys(data.data).map((header: any, index: number) => {
            return (
              header !== "uuid" && <td key={index}>{data.data[header]}</td>
            );
          })}
          <td id="delete" onClick={() => handleDelete(data.data.uuid)}></td>
        </tr>
        <tr>
          <td style={{ paddingLeft: "40px" }}>
            {show &&
              subDatas.map((data: any) => (
                <TableComponent
                  key={data.data.uuid}
                  data={data}
                  handleDelete={handleSubTodoDelete}
                  // handleShow={data.show}
                />
              ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableComponent;
