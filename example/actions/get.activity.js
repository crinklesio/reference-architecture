import { useQuery } from "./useQuery";

// a pure JS function that fetches the data and returns the result. It allows
// for business logic to be present, create the URL properly, etc.
export async function getActivity({ id }) {
  try {
    const res = await fetch(`${url}/${id}`);
    // e.g. more data transformation here, or grouping after multiple fetches
    return [await res.json(), null];
  } catch (e) {
    return [null, e];
  }
}

// Bind the action with a custom hook to React
export function useGetActivity({ id }) {
  return useQuery(getActivity, { id });
}
