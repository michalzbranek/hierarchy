function InnerDataComponent({
  data,
  uuid,
  handleDelete,
  handleShowHide,
}: InnerDataProps) {
  return (
    <tr>
      {data[`${uuid}`] !== undefined &&
      data[`${uuid}`].childrens.length !== 0 ? (
        <td id="children" onClick={() => handleShowHide(uuid)}></td>
      ) : (
        <td style={{ border: "1px solid black", backgroundColor: "grey" }}></td>
      )}
      {data[`${uuid}`] !== undefined &&
        Object.keys(data[`${uuid}`].data).map(
          (header: string, index: number) =>
            header !== "uuid" && (
              <td key={index} style={{ border: "1px solid black" }}>
                {data[`${uuid}`].data[header as keyof ProcessedData]}
              </td>
            )
        )}
      <td id="delete" onClick={() => handleDelete(uuid)}></td>
    </tr>
  );
}

export default InnerDataComponent;
