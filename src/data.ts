import { createSlice } from "@reduxjs/toolkit";
import initialDataState from "./prepareInitialData";

const deleteElement = (state: ReduxInnerType, uuid: string) => {
  // recursively apply deleteElement on every children
  if (state.value[`${uuid}`].childrens.length !== 0) {
    state.value[`${uuid}`].childrens.map((childrenUuid: string) =>
      deleteElement(state, childrenUuid)
    );
  }
  // delete UUID in parent array
  const parentUUID = state.value[`${uuid}`].parentUUID;
  if (parentUUID !== undefined) {
    state.value[`${parentUUID}`].childrens = state.value[
      `${parentUUID}`
    ].childrens.filter((childrenUUID: string) => childrenUUID !== uuid);
  } else {
    state.value.root.childrens = state.value.root.childrens.filter(
      (baseUUID: string) => baseUUID !== uuid
    );
  }
  // delete element
  delete state.value[uuid];
};

const showHide = (state: ReduxInnerType, uuid: string) => {
  if (state.value[`${uuid}`].showChildrens === true) {
    state.value = {
      ...state.value,
      [uuid]: {
        ...state.value[uuid],
        showChildrens: !state.value[uuid].showChildrens,
      },
    };
    state.value[`${uuid}`].childrens.map((childrenUuid: string) =>
      showHide(state, childrenUuid)
    );
  }
};

const showHideElement = (state: ReduxInnerType, uuid: string) => {
  state.value = {
    ...state.value,
    [uuid]: {
      ...state.value[uuid],
      showChildrens: !state.value[uuid].showChildrens,
    },
  };
  if (state.value[`${uuid}`].showChildrens === true) {
    state.value[`${uuid}`].childrens.map((childrenUuid: string) =>
      showHide(state, childrenUuid)
    );
  }
};

const dataSlice = createSlice({
  name: "data",
  initialState: { value: initialDataState() },
  reducers: {
    deleteData: (state, action) => {
      deleteElement(state, action.payload);
    },
    showData: (state, action) => {
      showHideElement(state, action.payload);
    },
  },
});

export const { deleteData, showData } = dataSlice.actions;
export default dataSlice.reducer;
