import { useQuery } from "./useQuery";

export async function getActivity({ id }) {
  try {
    const res = await fetch(`${url}/${id}`);
    // e.g. more data transformation here, or grouping after multiple fetches
    return [await res.json(), null];
  } catch (e) {
    return [null, e];
  }
}

export function useGetActivity({ id }) {
  return useQuery(getActivity, { id });
}
