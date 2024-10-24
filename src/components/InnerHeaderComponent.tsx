function InnerHeaderComponent({ data, uuid }: InnerHeaderProps) {
  return (
    <thead>
      <tr>
        {data[`${uuid}`].childrens.length !== 0 && <td>children</td>}
        {data[`${uuid}`].childrens.length !== 0 &&
          Object.keys(data[`${data[`${uuid}`].childrens[0]}`].data).map(
            (header: string, index: number) =>
              header !== "uuid" && <td key={index}>{header}</td>
          )}
        {data[`${uuid}`].childrens.length !== 0 && <td>delete</td>}
      </tr>
    </thead>
  );
}
export default InnerHeaderComponent;
