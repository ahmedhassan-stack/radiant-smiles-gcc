import { useState, useEffect, useCallback } from "react";
import { fetchClinicData, type ClinicData, getClinicData } from "@/lib/clinicData";

export function useClinicData(): ClinicData {
  const [data, setData] = useState<ClinicData>(getClinicData());

  const load = useCallback(async () => {
    const d = await fetchClinicData();
    setData(d);
  }, []);

  useEffect(() => {
    load();
    const handler = () => { load(); };
    window.addEventListener("clinic-data-updated", handler);
    return () => window.removeEventListener("clinic-data-updated", handler);
  }, [load]);

  return data;
}
