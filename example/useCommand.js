import { useState } from "react";

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
