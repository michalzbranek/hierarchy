function TableComponent({ data, headers }: any) {
  const deleteRow = () => {};

  return (
    <table>
      <thead>
        <tr>
          {headers &&
            headers.map((header: any, index: number) => {
              return <td key={index}>{header}</td>;
            })}
          <td>delete</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row: any, index: number) => {
            return (
              <tr key={index}>
                <td>{row.data.ID}</td>
                <td>{row.data.Name}</td>
                <td>{row.data.Gender}</td>
                <td>{row.data.Ability}</td>
                <td>{row.data["Minimal distance"]}</td>
                <td>{row.data.Weight}</td>
                <td>{row.data.Born}</td>
                <td>{row.data["In space since"]}</td>
                <td>{row.data["Beer consumption (l/y)"]}</td>
                <td>{row.data["Knows the answer?"]}</td>
                <td>
                  <button onClick={deleteRow}>X</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableComponent;
