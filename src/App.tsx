import "./App.css";
import TableComponent from "./components/TableComponent";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state: ReduxValueType) => state.data.value);

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
                showChildrens={data[`${uuid}`].showChildrens}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default App;
