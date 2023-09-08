import { useState, useEffect } from "react";

export function useQuery(query, args) {
  const [results, setResults] = useState({
    data: null,
    isLoading: false,
    errors: null,
  });

  async function refresh() {
    setResults((r) => ({ ...r, isLoading: true }));
    const [data, errors] = await query(args);
    setResults((r) => ({ ...r, isLoading: false, data, errors }));
  }

  useEffect(() => {
    if (results.isLoading) return;
    refresh();
  }, [args]);

  return { ...results, refresh };
}
