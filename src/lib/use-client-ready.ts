"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
// The server and first hydration render agree; persisted browser data appears afterwards.
export function useClientReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
