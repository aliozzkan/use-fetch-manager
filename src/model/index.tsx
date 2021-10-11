export const Fulfilled = "fulfilled";
export const Rejected = "rejected";
export const Pending = "pending";

export enum ManagerStatus {
  fulfilled = "fulfilled",
  rejected = "rejected",
  pending = "pending",
}

export type Status = typeof Fulfilled | typeof Rejected | typeof Pending | null;
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export interface Options<T extends (...args: any) => any> {
  globalKey?: string;
  onSuccess?: (repsonse: any) => void;
  onReject?: () => void;
  initial?: Parameters<T>;
}
