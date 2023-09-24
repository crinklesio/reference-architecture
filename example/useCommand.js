import { useState } from "react";

// generic useCommand hook to bind async functions to React and provide
// feedback in the UI (i.e. loading state)
export function useCommand(fn) {
  const [isLoading, setLoading] = useState(false);

  async function handler(...args) {
    try {
      setLoading(true);
      return await fn(...args);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  return [handler, isLoading];
}
