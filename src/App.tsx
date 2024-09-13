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

  let draftData: any = {};

  const handleDelete = (uuid: string) => {
    if (draftData[`${uuid}`].childrens.length !== 0) {
      draftData[`${uuid}`].childrens.map((childrenUuid: string) =>
        handleDelete(childrenUuid)
      );
    }
    const parentUUID = draftData[`${uuid}`].parent;
    if (parentUUID !== undefined) {
      draftData = produce(draftData, (draft: any) => {
        const index = draft[`${parentUUID}`].childrens.findIndex(
          (children: any) => {
            return children === uuid;
          }
        );
        if (index !== -1) {
          draft[`${parentUUID}`].childrens.splice(index, 1);
        }
      });
    } else {
      draftData = produce(draftData, (draft: any) => {
        const index = draft.arrayOfParentUUIDs.findIndex((element: any) => {
          return element === uuid;
        });
        if (index !== -1) {
          draft.arrayOfParentUUIDs.splice(index, 1);
        }
      });
    }
    draftData = produce(draftData, (draft: any) => {
      delete draft[`${uuid}`];
    });
  };

  const manageDelete = (uuid: string) => {
    draftData = data;
    handleDelete(uuid);
    setData(draftData);
  };

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
