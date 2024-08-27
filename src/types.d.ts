type RawData = {
    ID: string;
    Name: string;
    Gender: string;
    Ability: string;
    Minimal_distance: number;
    Weight: number;
    Born: string;
    In_space_since: string;
    Beer_consumption: number;
    Knows_the_answer: string;
    Character_ID: number;
    Is_alive: string;
    Years: number;
    Nemesis_ID: number;
    Secrete_Code: number;
  };

  type ProcessedData = RawData & { uuid: string };

  type ChildrenRecords = {
    has_nemesis?: { records: Array<DatabaseRecord> };
    has_secrete?: { records: Array<DatabaseRecord> };
  };

  type DatabaseRecord = {
    data: ProcessedData;
    children: ChildrenRecords;
  };

  type JsonDatabase = Array<DatabaseRecord>;

  