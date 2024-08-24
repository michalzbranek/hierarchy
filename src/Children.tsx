import { Fragment } from "react/jsx-runtime";

function Children({ row, rowIndex, removeChildren }: any) {
  const deleteChildren = (rowIndex:number, records: number, index: number) => {
    removeChildren(rowIndex, records, index);
  };

  return (
    <>
      {Object.keys(row.children.data).length !== 0 && (
        <>
          {Object.keys(row.children.data.has_nemesis.records).map(
            (children, index) => {
              return (
                <Fragment key={index}>
                  <tr style={{ backgroundColor: "orange" }}>
                    {Object.keys(
                      row.children.data.has_nemesis.records[children].data
                    ).map((key, index) => {
                      return (
                        <td style={{ border: "none" }} key={index}>
                          {key}
                        </td>
                      );
                    })}
                    <td>delete</td>
                  </tr>
                  <tr
                    key={row.children.uuid}
                    style={{ backgroundColor: "Aqua" }}
                  >
                    {Object.keys(
                      row.children.data.has_nemesis.records[children].data
                    ).map((key, index) => {
                      return (
                        <td style={{ border: "none" }} key={index}>
                          {
                            row.children.data.has_nemesis.records[children]
                              .data[key]
                          }
                        </td>
                      );
                    })}
                    <td>
                      <button onClick={() => deleteChildren(rowIndex, index, row.children.data.has_nemesis.records[index].data.ID)}>
                        X
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            }
          )}
        </>
      )}
    </>
  );
}

export default Children;
