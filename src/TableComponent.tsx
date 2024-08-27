import { useState } from "react";

function TableComponent({ data, handleDelete }: any) {
  const [show, setShow] = useState(false);
  const [subDatas, setSubDatas] = useState<JsonDatabase>(data.children);

  const handleSubTodoDelete = (uuid: string) => {
    setSubDatas((prevDatas: JsonDatabase) =>
      prevDatas.filter(({ data }: DatabaseRecord) => data.uuid !== uuid)
    );
  };

  const showHide = () => {
    setShow(!show);
  };

  return (
    <>
      <tr>
        {Object.keys(data.children).length !== 0 && subDatas.length !== 0 ? (
          <td id="children" onClick={showHide}></td>
        ) : (
          <td></td>
        )}
        {Object.keys(data.data).map(
          (header: string, index: number) =>
            header !== "uuid" && <td key={index}>{data.data[header]}</td>
        )}
        <td id="delete" onClick={() => handleDelete(data.data.uuid)}></td>
      </tr>
      <tr>
        <td>
          {show && (
            <table>
              <thead>
                <tr>
                  {Object.keys(data.children).length !== 0 &&
                    subDatas.length !== 0 && <td>children</td>}
                  {Object.keys(data.children).length !== 0 &&
                    subDatas.length !== 0 &&
                    Object.keys(data.children[0].data).map(
                      (header: string, index: number) =>
                        header !== "uuid" && <td key={index}>{header}</td>
                    )}
                  {Object.keys(data.children).length !== 0 &&
                    subDatas.length !== 0 && <td>delete</td>}
                </tr>
              </thead>
              <tbody>
                {Object.keys(subDatas).length !== 0 &&
                  subDatas.map((data: DatabaseRecord) => (
                    <TableComponent
                      key={data.data.uuid}
                      data={data}
                      handleDelete={handleSubTodoDelete}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </td>
      </tr>
    </>
  );
}

export default TableComponent;
