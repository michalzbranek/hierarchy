import InnerDataComponent from "./InnerDataComponent";
import InnerHeaderComponent from "./InnerHeaderComponent";

function TableComponent({ data, uuid, showChildrens }: TableComponentProps) {
  return (
    <>
      <InnerDataComponent data={data} uuid={uuid} />
      {showChildrens && (
        <tr>
          <td>
            <table style={{ marginLeft: "100px", width: "800px" }}>
              <InnerHeaderComponent data={data} uuid={uuid} />
              <tbody>
                {data[`${uuid}`].childrens.length !== 0 &&
                  data[`${uuid}`].childrens.map(
                    (uuid: string, index: number) => {
                      return (
                        <TableComponent
                          key={index}
                          data={data}
                          uuid={uuid}
                          showChildrens={data[`${uuid}`].showChildrens}
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
