import "./App.css";
import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
const res = await fetch("./data.json");
const jsonData = await res.json();

function App() {
  const parseJsonDatabase = (json: JsonDatabase): Array<DatabaseRecord> =>
    json.map(({ data, children }) => ({
      data: { ...data, uuid: crypto.randomUUID() },
      children: parseChildNode(children),
    }));

  const parseChildNode = ({ has_nemesis, has_secrete }: ChildrenRecords) => {
    if (has_nemesis) {
      return parseJsonDatabase(has_nemesis.records);
    }

    if (has_secrete) {
      return parseJsonDatabase(has_secrete.records);
    }

    return {};
  };

  const [data, setData] = useState<JsonDatabase>();

  useEffect(() => {
    setData(parseJsonDatabase(jsonData));
  }, []);

  const handleDelete = (uuid: number) => {
    setData((prevData: any) =>
      prevData.filter(({ data }: any) => data.uuid !== uuid)
    );
  };

  return (
    <>
      {data?.map((data: DatabaseRecord) => (
        <TableComponent
          key={data.data.uuid}
          data={data}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default App;
