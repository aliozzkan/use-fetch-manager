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
  error: any;
  onReset: () => void;
  status: Status;
} {
  const [data, setData] = useState<ThenArg<ReturnType<T>> | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [error, setError] = useState<any>(null);
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
            error: null,
          },
        }));
      } else {
        setData(_data);
        setStatus(Fulfilled);
        setError(null);
      }
      if (!!options.onSuccess) {
        options.onSuccess(_data);
      }
      return _data;
    } catch (_error) {
      if (!!options.globalKey) {
        globalFetch.setData((prev: any) => ({
          ...prev,
          [options.globalKey!]: {
            ...prev[options.globalKey!],
            data: null,
            status: Rejected,
            error: _error,
          },
        }));
      } else {
        setStatus(Rejected);
        setData(_error as unknown as any);
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
          error: null,
        },
      }));
    } else {
      setData(null);
      setStatus(null);
      setError(null);
    }
  }

  useEffect(() => {
    if (!!options.initial) {
      processAsync(...options.initial);
    }
  }, []);

  return {
    data: (!!options.globalKey
      ? globalFetch["data"] &&
        globalFetch["data"][options.globalKey] &&
        globalFetch["data"][options.globalKey].data
      : data) as ThenArg<D> | null,
    onReset: reset,
    fetch: processAsync,
    status: !!options.globalKey
      ? globalFetch["data"] &&
        globalFetch["data"][options.globalKey] &&
        globalFetch["data"][options.globalKey].status
      : status,
    hasData: !!((
      !!options.globalKey
        ? globalFetch["data"] &&
          globalFetch["data"][options.globalKey] &&
          globalFetch["data"][options.globalKey].data
        : data
    ) as ThenArg<D> | null),
    isFullfilled: (!!options.globalKey
      ? globalFetch["data"] &&
        globalFetch["data"][options.globalKey] &&
        globalFetch["data"][options.globalKey].status === "fulfilled"
      : status === "fulfilled") as boolean,
    isPending: (!!options.globalKey
      ? globalFetch["data"] &&
        globalFetch["data"][options.globalKey] &&
        globalFetch["data"][options.globalKey].status === "pending"
      : status === "pending") as boolean,
    isRejected: (!!options.globalKey
      ? globalFetch["data"] &&
        globalFetch["data"][options.globalKey] &&
        globalFetch["data"][options.globalKey].status === "rejected"
      : status === "rejected") as boolean,
    error: (!!options.globalKey
      ? globalFetch["data"] &&
        globalFetch["data"][options.globalKey] &&
        globalFetch["data"][options.globalKey].error
      : error) as ThenArg<D> | null,
  };
}
