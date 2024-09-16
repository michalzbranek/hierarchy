import "./App.css";
import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";

const res = await fetch("./data.json");
const jsonData = await res.json();

function App() {
  const normalizedDataObject: NormalizedDataObject = {};
  const [data, setData] = useState<NormalizedDataObject>({});
  let temporaryData: NormalizedDataObject = {};

  // remove has_nemesis and has_secrete and apply UUID to every element
  const parseJsonDatabase = (json: JsonDatabase): Array<DatabaseRecord> =>
    json.map(({ data, children }) => ({
      data: { ...data, uuid: crypto.randomUUID() },
      children: parseChildNode(children),
    }));

  const parseChildNode = (children: ChildrenRecords) => {
    if (!Array.isArray(children)) {
      if (children.has_nemesis) {
        return parseJsonDatabase(children.has_nemesis.records);
      }

      if (children.has_secrete) {
        return parseJsonDatabase(children.has_secrete.records);
      }
    }

    return {};
  };

  const getRootUUIDs = (json: Array<DatabaseRecord>) =>
    json.map((element: DatabaseRecord) => element.data.uuid);

  const normalize = (json: Array<DatabaseRecord>, parent?: string) => {
    // go through every element of parsed json
    for (const oldElement of json) {
      let childrensArray = [];
      // if there is at least one children then push its UUID into array
      if (
        Array.isArray(oldElement.children) &&
        oldElement.children.length !== undefined
      ) {
        for (const children of oldElement.children) {
          childrensArray.push(children.data.uuid);
        }
      }
      // create new element with its parent UUID, its data and its childrens array
      const normalizedElement = {
        parentUUID: parent!,
        data: oldElement.data,
        childrens: childrensArray as string[],
      };
      // recursively call normalize for its children from old parsed json
      if (Array.isArray(oldElement.children)) {
        oldElement.children.length !== undefined &&
          normalize(oldElement.children, oldElement.data.uuid);
      }
      normalizedDataObject[normalizedElement.data.uuid!] = normalizedElement;
    }
    // this applies to root elements that don't have its parent
    const normalizedRoot = {
      parentUUID: "",
      data: {},
      childrens: getRootUUIDs(json) as string[],
    };
    normalizedDataObject.root = normalizedRoot;
  };

  useEffect(() => {
    const parsedJsonDatabase = parseJsonDatabase(jsonData);
    normalize(parsedJsonDatabase);
    setData(normalizedDataObject);
  }, []);

  const deleteUUID = (uuid: string) => {
    // recursively apply deleteUUID on every children
    if (temporaryData[`${uuid}`].childrens.length !== 0) {
      temporaryData[`${uuid}`].childrens.map((childrenUuid: string) =>
        deleteUUID(childrenUuid)
      );
    }
    // delete UUID in parent array
    const parentUUID = temporaryData[`${uuid}`].parentUUID;
    if (parentUUID !== undefined) {
      temporaryData[`${parentUUID}`].childrens = temporaryData[
        `${parentUUID}`
      ].childrens.filter((childrenUUID: string) => childrenUUID !== uuid);
    } else {
      temporaryData.root.childrens = temporaryData.root.childrens.filter(
        (baseUUID: string) => baseUUID !== uuid
      );
    }
    // delete element
    const { [uuid]: removedElement, ...rest } = temporaryData;
    temporaryData = rest;
  };

  const handleDelete = (uuid: string) => {
    temporaryData = data;
    deleteUUID(uuid);
    setData(temporaryData);
  };

  const renderHeader = () =>
    Object.keys(data[`${data.root.childrens[0]}`].data).map(
      (header: string, index: number) =>
        header !== "uuid" && <td key={index}>{header}</td>
    );

  return (
    <table>
      <thead>
        <tr>
          {data.root !== undefined && data.root.childrens.length !== 0 && (
            <>
              <td>children</td>
              {renderHeader()}
              <td>delete</td>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.root !== undefined &&
          data.root.childrens?.map((uuid: string, index: number) => {
            return (
              <TableComponent
                key={index}
                data={data}
                uuid={uuid}
                handleDelete={handleDelete}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default App;
