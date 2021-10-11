import { useEffect, useState } from "react";
import { useFetchGlobal, useFetchManagerProvider } from "./hooks/provider";
import {
  Status,
  ThenArg,
  Fulfilled,
  Pending,
  Rejected,
  ManagerStatus,
  Options,
} from "./model";

export type { ManagerStatus };
export { useFetchManagerProvider };

export function useFetchManager<T extends (...args: any) => any, D = any>(
  func: T,
  options: Options<T> = {}
): {
  fetch: (...params: Parameters<T>) => Promise<ThenArg<ReturnType<T>>>;
  isFullfilled: boolean;
  isRejected: boolean;
  isPending: boolean;
  hasData: boolean;
  data: ThenArg<D> | null;
  onReset: () => void;
  status: Status;
} {
  const [data, setData] = useState<ThenArg<ReturnType<T>> | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const globalFetch = useFetchGlobal();

  async function processAsync(
    ...params: Parameters<T>
  ): Promise<ThenArg<ReturnType<T>>> {
    if (!!options.globalKey) {
      globalFetch.setData((prev: any) => ({
        ...prev,
        [options.globalKey!]: {
          ...prev[options.globalKey!],
          status: Pending,
        },
      }));
    } else {
      setStatus(Pending);
    }
    try {
      const _data = await func(...(params as any));
      if (!!options.globalKey) {
        globalFetch.setData((prev: any) => ({
          ...prev,
          [options.globalKey!]: {
            ...prev[options.globalKey!],
            data: _data,
            status: Fulfilled,
          },
        }));
      } else {
        setData(_data);
        setStatus(Fulfilled);
      }
      if (!!options.onSuccess) {
        options.onSuccess(_data);
      }
      return _data;
    } catch (error) {
      if (!!options.globalKey) {
        globalFetch.setData((prev: any) => ({
          ...prev,
          [options.globalKey!]: {
            ...prev[options.globalKey!],
            data: null,
            status: Rejected,
          },
        }));
      } else {
        setStatus(Rejected);
      }
      if (!!options.onReject) {
        options.onReject();
      }
      return error as any;
    }
  }

  async function reset() {
    if (!!options.globalKey) {
      globalFetch.setData((prev: any) => ({
        ...prev,
        [options.globalKey!]: {
          ...prev[options.globalKey!],
          data: null,
          status: null,
        },
      }));
    } else {
      setData(null);
      setStatus(null);
    }
  }

  useEffect(() => {
    if (!!options.initial) {
      processAsync(...options.initial);
    }
  }, []);

  return {
    data: (!!options.globalKey
      ? globalFetch.data[options.globalKey].data
      : data) as ThenArg<D> | null,
    onReset: reset,
    fetch: processAsync,
    status: !!options.globalKey
      ? globalFetch.data[options.globalKey].status
      : status,
    hasData: !!((
      !!options.globalKey ? globalFetch.data[options.globalKey].data : data
    ) as ThenArg<D> | null),
    isFullfilled: status === Fulfilled,
    isPending: status === Pending,
    isRejected: status === Rejected,
  };
}
