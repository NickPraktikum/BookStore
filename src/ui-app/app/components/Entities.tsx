"use client";

import { useStoreState } from "@/app/store/Store";
import Authors from "./Authors";
import Books from "./Books";

const Entities = () => {
  const entitySelection = useStoreState((store) => store.entitySelection);
  const entityState = useStoreState((store) => store.entityState);
  return (
    <>
      {entitySelection == "authors" ? (
        <Authors state={entityState} />
      ) : (
        <Books state={entityState} />
      )}
    </>
  );
};
export default Entities;
