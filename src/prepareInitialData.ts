const res = await fetch("./data.json");
const jsonData = await res.json();

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

const normalize = (
  json: Array<DatabaseRecord>,
  normalizedDataObject: NormalizedDataObject,
  parent?: string
) => {
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
      showChildrens: false,
    };
    // recursively call normalize for its children from old parsed json
    if (Array.isArray(oldElement.children)) {
      oldElement.children.length !== undefined &&
        normalize(
          oldElement.children,
          normalizedDataObject,
          oldElement.data.uuid
        );
    }
    normalizedDataObject[normalizedElement.data.uuid!] = normalizedElement;
  }
  // this applies to root elements that don't have its parent
  const normalizedRoot = {
    parentUUID: "",
    data: {},
    childrens: getRootUUIDs(json) as string[],
    showChildrens: false,
  };
  normalizedDataObject.root = normalizedRoot;
};

function initialDataState(): NormalizedDataObject {
  const parsedJsonDatabase = parseJsonDatabase(jsonData);
  const normalizedDataObject: NormalizedDataObject = {};
  normalize(parsedJsonDatabase, normalizedDataObject);
  return normalizedDataObject;
}

export default initialDataState;
