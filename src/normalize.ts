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

export default normalize;
