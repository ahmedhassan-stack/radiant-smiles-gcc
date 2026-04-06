import { useState, useEffect, useSyncExternalStore } from "react";
import { getClinicData, type ClinicData } from "@/lib/clinicData";

function subscribe(cb: () => void) {
  window.addEventListener("clinic-data-updated", cb);
  return () => window.removeEventListener("clinic-data-updated", cb);
}

export function useClinicData(): ClinicData {
  return useSyncExternalStore(subscribe, getClinicData, getClinicData);
}
