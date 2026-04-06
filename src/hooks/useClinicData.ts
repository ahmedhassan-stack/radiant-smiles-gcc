import { useSyncExternalStore } from "react";
import { getClinicData, type ClinicData } from "@/lib/clinicData";

let cached: ClinicData = getClinicData();

function subscribe(cb: () => void) {
  const handler = () => {
    cached = getClinicData();
    cb();
  };
  window.addEventListener("clinic-data-updated", handler);
  return () => window.removeEventListener("clinic-data-updated", handler);
}

function getSnapshot() {
  return cached;
}

export function useClinicData(): ClinicData {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
