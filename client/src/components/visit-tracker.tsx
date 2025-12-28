import { useEffect, useRef } from "react";
import { useLogVisit } from "@/hooks/use-visits";
import { useLocation } from "wouter";

export function VisitTracker() {
  const [location] = useLocation();
  const { mutate } = useLogVisit();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent duplicate logs for same path (React StrictMode double render)
    if (lastPath.current !== location) {
      mutate({ path: location });
      lastPath.current = location;
    }
  }, [location, mutate]);

  return null;
}
