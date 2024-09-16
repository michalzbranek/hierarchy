import { useState } from "react";

function TableComponent({ data, uuid, handleDelete }: TableComponentProps) {
  const [show, setShow] = useState(false);

  const showHide = () => {
    setShow((showing) => !showing);
  };

  const handleDeleteAndShow = (uuid: string) => {
    show === true && setShow((showing) => !showing);
    handleDelete(uuid);
  };

  return (
    <>
      <tr>
        {data[`${uuid}`] !== undefined &&
        data[`${uuid}`].childrens.length !== 0 ? (
          <td id="children" onClick={showHide}></td>
        ) : (
          <td
            style={{ border: "1px solid black", backgroundColor: "grey" }}
          ></td>
        )}
        {data[`${uuid}`] !== undefined &&
          Object.keys(data[`${uuid}`].data).map(
            (header: string, index: number) =>
              header !== "uuid" && (
                <td key={index} style={{ border: "1px solid black" }}>
                  {data[`${uuid}`].data[header as keyof ProcessedData]}
                </td>
              )
          )}
        <td id="delete" onClick={() => handleDeleteAndShow(uuid)}></td>
      </tr>
      {show && (
        <tr>
          <td>
            <table style={{ marginLeft: "100px", width: "800px" }}>
              <thead>
                <tr>
                  {data[`${uuid}`].childrens.length !== 0 && <td>children</td>}
                  {data[`${uuid}`].childrens.length !== 0 &&
                    Object.keys(
                      data[`${data[`${uuid}`].childrens[0]}`].data
                    ).map(
                      (header: string, index: number) =>
                        header !== "uuid" && <td key={index}>{header}</td>
                    )}
                  {data[`${uuid}`].childrens.length !== 0 && <td>delete</td>}
                </tr>
              </thead>
              <tbody>
                {data[`${uuid}`].childrens.length !== 0 &&
                  data[`${uuid}`].childrens.map(
                    (uuid: string, index: number) => {
                      return (
                        <TableComponent
                          key={index}
                          data={data}
                          uuid={uuid}
                          handleDelete={handleDelete}
                        />
                      );
                    }
                  )}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}

export default TableComponent;
