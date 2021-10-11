import { useState } from "react";

const Fulfilled = "fulfilled";
const Rejected = "rejected";
const Pending = "pending";

export enum ManagerStatus {
  fulfilled = "fulfilled",
  rejected = "rejected",
  pending = "pending",
}

type Status = typeof Fulfilled | typeof Rejected | typeof Pending | null;
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export function useFetchManager<T extends (...args: any) => any, D = any>(
  func: T
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

  async function processAsync(
    ...params: Parameters<T>
  ): Promise<ThenArg<ReturnType<T>>> {
    setStatus(Pending);
    try {
      const data = await func(...(params as any));
      setData(data);
      setStatus(Fulfilled);
      return data;
    } catch (error) {
      console.log(error);
      setStatus(Rejected);
      return error as any;
    }
  }

  async function reset() {
    setData(null);
    setStatus(null);
  }

  return {
    data,
    onReset: reset,
    fetch: processAsync,
    status,
    hasData: !!data,
    isFullfilled: status === Fulfilled,
    isPending: status === Pending,
    isRejected: status === Rejected,
  };
}
