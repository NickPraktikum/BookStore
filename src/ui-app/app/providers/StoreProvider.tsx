"use client";
import { Store } from "@/app/store/Store";
import { StoreProvider } from "easy-peasy";

export default function StoreProviderState({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider store={Store}>{children}</StoreProvider>;
}
