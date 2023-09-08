import { useCommand } from "./useCommand";

export async function createActivity(data) {
  try {
    const errors = validateActivity(data);
    if (errors) return [null, errors];
    const res = await fetch(...);
    return [await res.json(), null];
  } catch (e) {
    return [null, e];
  }
}

export function useCreateActivity() {
  return useCommand(createActivity);
}