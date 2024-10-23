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

export default showHideElement;
