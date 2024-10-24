import normalize from "./normalize";
import parseJsonDatabase from "./parseJson";

const res = await fetch("./data.json");
const jsonData = await res.json();

function initialDataState(): NormalizedDataObject {
  const parsedJsonDatabase = parseJsonDatabase(jsonData);
  const normalizedDataObject: NormalizedDataObject = {};
  normalize(parsedJsonDatabase, normalizedDataObject);
  return normalizedDataObject;
}

export default initialDataState;
