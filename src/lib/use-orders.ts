"use client";
import { useMemo, useSyncExternalStore } from "react";
import { orderEvent, orderStorageKey, parseOrders } from "./orders";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(orderEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(orderEvent, callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(orderStorageKey);
  } catch {
    return null;
  }
}
export function useOrders() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  return useMemo(() => parseOrders(raw), [raw]);
}
