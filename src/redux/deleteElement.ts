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

export default deleteElement;
