type RawData = {
  ID?: string;
  Name?: string;
  Gender?: string;
  Ability?: string;
  Minimal_distance?: number;
  Weight?: number;
  Born?: string;
  In_space_since?: string;
  Beer_consumption?: number;
  Knows_the_answer?: string;
  Character_ID?: number;
  Is_alive?: string;
  Years?: number;
  Nemesis_ID?: number;
  Secrete_Code?: number;
};

type ProcessedData = RawData & { uuid?: string };

type ChildrenRecords =
  | {
      has_nemesis?: { records: Array<DatabaseRecord> };
      has_secrete?: { records: Array<DatabaseRecord> };
    }
  | Array<DatabaseRecord>;

type DatabaseRecord = {
  data: ProcessedData;
  children: ChildrenRecords;
};

type JsonDatabase = Array<DatabaseRecord>;

type ProcessedDatabaseRecord = {
  data: ProcessedData;
  children: Array<ProcessedDatabaseRecord>;
};

type NormalizedDataInnerElement = {
  parentUUID: string;
  data: ProcessedData;
  childrens: string[];
  showChildrens: boolean;
};

type NormalizedDataObject = {
  [key: string]: NormalizedDataInnerElement;
};

interface TableComponentProps {
  data: NormalizedDataObject;
  uuid: string;
  handleDelete(uuid: string): void;
  handleShowHide(uuid: string): void;
  showChildrens: boolean;
}

interface InnerHeaderProps {
  data: NormalizedDataObject;
  uuid: string;
}

interface InnerDataProps {
  data: NormalizedDataObject;
  uuid: string;
  handleDelete(uuid: string): void;
  handleShowHide(uuid: string): void;
}
