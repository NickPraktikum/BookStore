import { Action, action, createStore, createTypedHooks } from "easy-peasy";

export interface IStoreModel {
  entitySelection: "books" | "authors";
  entityState: "available" | "deleted";
  setEntitySelection: Action<IStoreModel, EntityTypes>;
  setEntityState: Action<IStoreModel, EntityStates>;
}
const StoreModel: IStoreModel = {
  entitySelection: "books",
  entityState: "available",
  setEntitySelection: action((state, payload) => {
    if (payload == "authors") {
      state.entitySelection = "authors";
    } else if (payload == "books") {
      state.entitySelection = "books";
    }
  }),
  setEntityState: action((state, payload) => {
    if (payload == "available") {
      state.entityState = "available";
    } else if (payload == "deleted") {
      state.entityState = "deleted";
    }
  }),
};
const { useStoreActions, useStoreState } = createTypedHooks<IStoreModel>();

export { useStoreActions, useStoreState };

export const Store = createStore(StoreModel);
