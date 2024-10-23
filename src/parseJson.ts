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

export default parseJsonDatabase;
