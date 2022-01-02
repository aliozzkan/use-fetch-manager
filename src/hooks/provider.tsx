import { createContext, useContext, useState } from "react";
import { Status } from "../model";

type FetchContextType = {
  data: {
    [key: string]: {
      data: any;
      status: Status;
      error: any;
    };
  };
  setData: any;
};

const FetchContext = createContext({} as FetchContextType);

export function useFetchManagerProvider() {
  const [data, setData] = useState<FetchContextType["data"]>({});
  return {data, setData, FetchContext};
}

export function useFetchGlobal() {
  return useContext(FetchContext);
}
