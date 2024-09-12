import { useState } from "react";

// function TableComponent({ data, handleDelete, arrayToBeDeleted }: any) {
function TableComponent({
  data,
  uuid,
  manageDelete,
}: // children,
// index,
// arrayIndex,
// handleDelete,
// arrayToBeDeleted,
any) {
  // CREATE VARIABLE TO STORE ARRAY OF INDEXES
  // const addedArrayIndex = [...arrayIndex, index];
  // console.log('addedArrayIndex', addedArrayIndex);

  const [show, setShow] = useState(false);
  // arrayIndex.push(index);
  // const indexes = useRef(arrayIndex);
  // console.log(indexes);
  // console.log("data", data);
  // arrayToBeDeleted.push(data.data.uuid);
  // console.log("afterRendering", arrayToBeDeleted);
  // const ref = useRef(arrayIndex)
  // let arrayIndex : number[] = [];
  // arrayIndex.push(index);
  // console.log(arrayIndex);

  // delete by index
  // const deletedTodosArray = produce(data, draft => {
  //   draft.splice(index, 1);
  // });

  // WITH IMMER
  // const handleArrayToBeDeleted = (row: any, array: any) =>
  // console.log("uuid", data.uuid);
  // arrayToBeDeleted.push(data.uuid);
  // produce(array, (draft: any) => {
  //   const index = draft.findIndex((a: any) => a.uuid === row.uuid);
  //   index !== -1 && draft.splice(index, 1);
  //   array.children.length !== 0 &&
  //     handleArrayToBeDeleted(row, array.children);
  // });

  // console.log(arrayIndex);
  // handleDelete(index);
  // arrayToBeDeleted = [];

  // WITHOUT IMMER
  // const getRemovedData = (row: any, array: any) => {
  //   const index = array.findIndex((a: any) => a.uuid === row.uuid);
  //   index !== -1 && array.splice(index, 1);
  //   array.children.length !== 0 && getRemovedData(row, array.children);
  // };

  // setData(getRemovedData(row, data));

  const showHide = () => {
    // arrayToBeDeleted.push(data.data.uuid);
    // arrayToBeDeleted = data.data.uuid;
    // console.log("afterClicking", arrayToBeDeleted);
    // console.log(arrayIndex);
    setShow((showing) => !showing);
  };

  // const handleSubTodoDelete = () => {};

  // const deletedArray = produce(data, (draft) => {

  // })

  // Recursive Call: In the recursive step, call the Immer producer function on the relevant part of the draft. This creates a new draft for that part, allowing you to modify it independently.

  // const updatedData = produce(originalData, (draft) => {
  //   // Base case: If the current value is 10, update it to 20
  //   if (draft.nested.deep.value === 10) {
  //     draft.nested.deep.value = 20;
  //   }

  //   // Recursive call: If the current value is an object, process it recursively
  //   if (typeof draft.nested.deep.value === 'object') {
  //     produce(draft.nested.deep.value, (innerDraft) => {
  //       // Process the inner object recursively
  //     });
  //   }
  // });

  // delete by id
  // const deletedTodosArray = produce(todosArray, (draft) => {
  //   const index = draft.findIndex((todo) => todo.id === "id1");
  //   if (index !== -1) draft.splice(index, 1);
  // });

  // return (
  //   <>
  //     <tr>
  //       {Object.keys(children).length !== 0 ? (
  //         <td id="children" onClick={showHide}></td>
  //       ) : (
  //         <td
  //           style={{ border: "1px solid black", backgroundColor: "grey" }}
  //         ></td>
  //       )}
  //       {Object.keys(data).map(
  //         (header: string, index: number) =>
  //           header !== "uuid" && (
  //             <td key={index}>{data[header as keyof ProcessedData]}</td>
  //           )
  //       )}
  //       <td
  //         id="delete"
  //         // onClick={() => handleDelete([...arrayIndex, index])}
  //       ></td>
  //     </tr>
  //     {show && (
  //       <tr>
  //         <td>
  //           <table style={{ marginLeft: "100px", width: "800px" }}>
  //             <thead>
  //               <tr>
  //                 {Object.keys(children).length !== 0 && <td>children</td>}
  //                 {Object.keys(children).length !== 0 &&
  //                   Object.keys(children[0].data).map(
  //                     (header: string, index: number) =>
  //                       header !== "uuid" && <td key={index}>{header}</td>
  //                   )}
  //                 {Object.keys(children).length !== 0 && <td>delete</td>}
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {Object.keys(children).length !== 0 &&
  //                 children.map(({ data, children }: any, index: number) => {
  //                   // arrayIndex.push(index);
  //                   return (
  //                     <TableComponent
  //                       key={data.uuid}
  //                       // index={index}
  //                       // arrayIndex={addedArrayIndex}
  //                       data={data}
  //                       children={children}
  //                       // handleDelete={handleDelete}
  //                       // arrayToBeDeleted={arrayToBeDeleted}
  //                     />
  //                   );
  //                 })}
  //             </tbody>
  //           </table>
  //         </td>
  //       </tr>
  //     )}
  //   </>
  // );
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
                <td key={index}>
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
