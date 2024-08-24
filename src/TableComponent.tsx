import { Fragment } from "react/jsx-runtime";
import Children from "./Children";

function TableComponent({ data, headers, remove, show, removeChildren }: any) {
  const deleteRow = (index: number) => {
    remove(index);
  };

  const showHide = (index: number) => {
    show(index);
  };

  const removeCh = (rowNumber: number, records: number, index: number) => {
    removeChildren(rowNumber, records, index);
  };

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          {headers &&
            headers.map((header: any, index: number) => {
              return <td key={index}>{header}</td>;
            })}
          <td>delete</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row: any, index: number) => {
            return (
              <Fragment key={index}>
                <tr key={index} style={{ backgroundColor: "violet" }}>
                  {Object.keys(row.children.data).length !== 0 ? (
                    <td>
                      <button onClick={() => showHide(row.children.uuid)}>
                        children
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                  {headers.map((header: any, index: number) => {
                    return <td key={index}>{row.data[header]}</td>;
                  })}
                  <td>
                    <button onClick={() => deleteRow(row.uuid)}>X</button>
                  </td>
                </tr>
                {row.show && <Children row={row} rowIndex={index} removeChildren={removeCh} />}
              </Fragment>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableComponent;
