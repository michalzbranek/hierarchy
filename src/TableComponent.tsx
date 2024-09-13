import { useState } from "react";

function TableComponent({ data, uuid, manageDelete }: any) {
  const [show, setShow] = useState(false);

  const showHide = () => {
    setShow((showing) => !showing);
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
                <td key={index} style={{border: "1px solid black"}}>
                  {data[`${uuid}`].data[header as keyof ProcessedData]}
                </td>
              )
          )}
        <td id="delete" onClick={() => manageDelete(uuid)}></td>
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
                  data[`${uuid}`].childrens.map((uuid: any, index: number) => {
                    return (
                      <TableComponent
                        key={index}
                        data={data}
                        uuid={uuid}
                        manageDelete={manageDelete}
                      />
                    );
                  })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}

export default TableComponent;
