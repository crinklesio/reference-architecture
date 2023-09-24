import { useCommand } from "./useCommand";

// a pure JS function that uses several models (validate, transform) with
// business logic. It also has a standardized
export async function createActivity(data) {
  try {
    const errors = validateActivity(data);
    if (errors) return [null, errors];
    const _data = transformActivity(data);
    const res = await fetch("/my/url", {
      body: JSON.stringify(_data),
    });
    return [await res.json(), null];
  } catch (e) {
    return [null, e];
  }
}

// Bind the action with a custom hook to React
export function useCreateActivity() {
  return useCommand(createActivity);
}
