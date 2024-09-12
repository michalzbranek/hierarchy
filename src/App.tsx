import "./App.css";
import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { produce } from "immer";

const res = await fetch("./data.json");
const jsonData = await res.json();

function App() {
  const parseJsonDatabase = (json: any) =>
    json.map(({ data, children }: any) => ({
      data: { ...data, uuid: crypto.randomUUID() },
      children: parseChildNode(children),
    }));

  const parseChildNode = ({ has_nemesis, has_secrete }: any) => {
    if (has_nemesis) {
      return parseJsonDatabase(has_nemesis.records);
    }

    if (has_secrete) {
      return parseJsonDatabase(has_secrete.records);
    }

    return {};
  };

  const getRootUUIDs = (json: any) =>
    json.map((element: any) => element.data.uuid);

  const normalizedDataObject: NormalizedDataObject = {};

  const normalize = (json: any, parentUuid?: string) => {
    for (const oldElement of json) {
      let childrensArray = [];
      if (oldElement.children.length !== undefined) {
        for (const children of oldElement.children) {
          childrensArray.push(children.data.uuid);
        }
      }
      const normalizedElement = {
        parent: parentUuid,
        data: oldElement.data,
        childrens: childrensArray,
      };
      oldElement.children.length !== undefined &&
        normalize(oldElement.children, oldElement.data.uuid);
      normalizedDataObject[normalizedElement.data.uuid] = normalizedElement;
    }
    normalizedDataObject.arrayOfParentUUIDs = getRootUUIDs(json);
  };

  const [data, setData] = useState<any>({});

  useEffect(() => {
    const parsedJsonDatabase = parseJsonDatabase(jsonData);
    normalize(parsedJsonDatabase);
    setData(normalizedDataObject);
  }, []);

  // const draftData = data;

  const handleDelete = (uuid: string) => {
    // console.log("uuidToDelete", uuid);
    if (data[`${uuid}`].childrens.length !== 0) {
      data[`${uuid}`].childrens.map((childrenUuid: string) =>
        handleDelete(childrenUuid)
      );
    }
    // delete it from parent array by id
    // console.log("parentUUID", data[`${uuid}`].parent);
    const parentUUID = data[`${uuid}`].parent;
    let filteredArray: any = {};
    if (parentUUID !== undefined) {
      // IMMER
      // console.log("parentID", data[`${parentUUID}`].data.ID);
      // setData(
      filteredArray = produce(data, (draft: any) => {
        const index = draft[`${parentUUID}`].childrens.findIndex(
          (children: any) => {
            // console.log("uuidToDelete", uuidToDelete);
            // console.log("parentUUID", parentUUID);
            return children === uuid;
          }
        );
        if (index !== -1) {
          draft[`${parentUUID}`].childrens.splice(index, 1);
          console.log("FOUND");
        }
      });
      // );

      // CLASSIC REACT
      // console.log(
      //   "childrenContain",
      //   data[`${parentUUID}`].childrens.includes(uuid)
      // );
      // setData(
      //   data[`${parentUUID}`].childrens.filter(
      //     (children: any) => children !== uuid
      //   )
      // );
    } else {
      // IMMER
      // setData(
      filteredArray = produce(data, (draft: any) => {
        const index = draft.arrayOfParentUUIDs.findIndex((element: any) => {
          // console.log("uuidToDelete", uuidToDelete);
          // console.log("parentUUID", parentUUID);
          return element === uuid;
        });
        if (index !== -1) {
          draft.arrayOfParentUUIDs.splice(index, 1);
          console.log("FOUND");
        }
      });
      // );

      // CLASSIC REACT
      // console.log("parentContain", data.arrayOfParentUUIDs.includes(uuid));
      // setData(
      //   data.arrayOfParentUUIDs.filter((element: any) => element !== uuid)
      // );
    }
    // IMMER
    // console.log("filteredArray", filteredArray);
    // console.log("filteredArrayRemovedElement", filteredArray[`${uuid}`]);
    // setData(
    //   produce(filteredArray, (draft: any) => {
    //     delete draft[`${uuid}`];
    //   })
    // );
    // CLASSIC REACT
    const { [uuid]: removedElement, ...rest } = filteredArray;
    console.log("removedElement", removedElement);
    console.log("restLength", Object.keys(rest).length);
    // data = rest;
    console.log("rest", rest);
    setData(rest);
  };

  const manageDelete = (uuid: string) => {
    // handleDelete(uuid);
    // setData(handleDelete(uuid));
    handleDelete(uuid);
  };

  console.log("data", data);
  console.log("dataLength", Object.keys(data).length);
  // console.log(
  //   "arrayOfParentUUIDs",
  //   data.arrayOfParentUUIDs !== undefined &&
  //     data.arrayOfParentUUIDs.length !== 0 &&
  //     data[`${data.arrayOfParentUUIDs[0]}`].data
  // );

  return (
    <table>
      <thead>
        <tr>
          {data.arrayOfParentUUIDs !== undefined &&
            data.arrayOfParentUUIDs.length !== 0 && <td>children</td>}
          {data.arrayOfParentUUIDs !== undefined &&
            data.arrayOfParentUUIDs.length !== 0 &&
            Object.keys(data[`${data.arrayOfParentUUIDs[0]}`].data).map(
              (header: string, index: number) =>
                header !== "uuid" && <td key={index}>{header}</td>
            )}
          {data.arrayOfParentUUIDs !== undefined &&
            data.arrayOfParentUUIDs.length !== 0 && <td>delete</td>}
        </tr>
      </thead>
      <tbody>
        {data.arrayOfParentUUIDs?.map((uuid: any, index: number) => {
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
  );
}

export default App;

// console.log("parentUuids", normalizedDataObject.map(element) => element.data.uuid);

// const dataWithUuids = addUuidsToEveryElement(jsonData);
// console.log(dataWithUuids);

// const normalize = (json: any) => {
//   const data = {parse(json: any)};
// };

// console.log(normalizedDataObject);

// normalize(parseJsonDatabase(jsonData));
// console.log(normalizedDataObject);
// setData(normalizedDataObject);
// const jsonWithUUIDs = parseJsonDatabase(jsonData);
// normalize(jsonWithUUIDs);
// normalizedDataObject.arrayOfParentUUIDs = getRootUUIDs(jsonWithUUIDs);
// setData(normalizedDataObject);

// console.log(data[0]);

// delete by index
// const deletedTodosArray = produce(todosArray, draft => {
//   draft.splice(3 /*the index */, 1)
// })

// const showToBeDeleted = (arrayToBeDeleted: any) => {
//   console.log("indexesToBeDeleted", arrayToBeDeleted);
//   console.log("eval", eval("data[0]"));
//   let indexTemplate = "data";
//   console.log("arrayToBeDeletedLength", arrayToBeDeleted.length);
//   for (let i = 0; i < arrayToBeDeleted.length; i++) {
//     i !== arrayToBeDeleted.length - 1 &&
//       (indexTemplate += `[${arrayToBeDeleted[i]}].children`);
//   }
//   console.log("indexTemplate", indexTemplate);
//   console.log(
//     "fullPath",
//     indexTemplate + "[" + arrayToBeDeleted[arrayToBeDeleted.length - 1] + "]"
//   );
//   console.log(
//     "fullPathValue",
//     eval(
//       indexTemplate +
//         "[" +
//         arrayToBeDeleted[arrayToBeDeleted.length - 1] +
//         "]"
//     )
//   );
//   console.log(
//     "indexToBeDeleted",
//     arrayToBeDeleted[arrayToBeDeleted.length - 1]
//   );

// const newData = produce(data, (draft: any) => {
// console.log("indexTemplate", indexTemplate);
// draft = (eval(indexTemplate)).splice(arrayToBeDeleted[arrayToBeDeleted.length - 1], 1);
// console.log(draft);
// draft[0].children.splice(0, 1);
// });

// console.log("newData", newData);
// setData(newData);
// };

// const deleteArray = (array: Array<string>) => (array.filter())

// setData((prevData: JsonDatabase) =>
//   prevData.filter((data: any)) => data.uuid !== uuid)
// );)

// delete by id
// const deletedTodosArray = produce(todosArray, draft => {
//   const index = draft.findIndex(todo => todo.id === "id1")
//   if (index !== -1) draft.splice(index, 1)
// })

// const deleteArrayImmer = produce(data, draft => {
//   const index = draft.findIndex(arrayPiece => arrayPiece.data.uuid !== array[array.length - 1])
// };

// const findIndexMethod = (array: string, draft: any) => {
//   console.log("draft", draft);
//   const index = draft.findIndex(
//     (arrayPiece: any) => arrayPiece.data.uuid !== array
//   );
//   if (index !== -1) {
//     console.log("index", index);
//     console.log("uuid", array);
//     draft.splice(index, 1);
//   }
// };

// const handleDelete = (array: string) => {
//   produce(data, (draft) => {
//     // console.log("draft", draft);
//     const index = draft.findIndex(
//       (arrayPiece: any) => arrayPiece.data.uuid === array
//     );
//     if (index !== -1) {
//       // console.log("found");
//       console.log("index", index);
//       // console.log("uuid", array);
//       draft.splice(index, 1);
//       setData(draft);
//     }
//   });
//   // deleteArray(array);
//   // setArrayToBeDeleted([]);
//   // console.log(data);
// };

// console.log(
//   data.arrayOfParentUUIDs !== undefined && data.arrayOfParentUUIDs[0]
// );
// console.log(
//   "firstObject",
//   data.arrayOfParentUUIDs !== undefined &&
//     data[`${data.arrayOfParentUUIDs[0]}`]
// );

//   <table>
//     <thead>
//       <tr>
//         {data.arrayOfParentUUIDs.length !== 0 && <td>children</td>}
//         {data?.length !== 0 &&
//           Object.keys(data?.[0].data || {}).map(
//             (header: string, index: number) =>
//               header !== "uuid" && <td key={index}>{header}</td>
//           )}
//         {data?.length !== 0 && <td>delete</td>}
//       </tr>
//     </thead>
//     <tbody>
//       {data.arrayOfParentUUIDs?.map(
//         ({ data, children }: any, index: number) => {
//           // arrayIndex.push(index);
//           // console.log(arrayIndex);
//           return (
//             <TableComponent
//               key={data.uuid}
//               // index={index}
//               // arrayIndex={[]}
//               data={data}
//               children={children}
//               // handleDelete={showToBeDeleted}
//               // arrayToBeDeleted={arrayToBeDeleted}
//             />
//           );
//         }
//       )}
//     </tbody>
//   </table>
// );
