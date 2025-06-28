import { Slot } from "expo-router";
import { DependentsProvider } from "@/contexts/dependent.context";

export default function Layout() {
  return (
    <DependentsProvider>
      <Slot />
    </DependentsProvider>
  );
}
