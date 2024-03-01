import { required, string, validate } from "opzet";
import { IProject } from "../types";
import gateway from "~/api/gateway";

const projectCreateSchema = {
  name: [required, string.type],
};

export async function createProject(input: Partial<IProject>, tags: any) {
  // fixed project status at all time for create
  const _input: Partial<IProject> = { ...input, status: "Active" };
  const errors = validate(_input, projectCreateSchema);
  // return errors that can be managed by the UI
  if (errors) return [null, errors];

  try {
    const url = `/projects`;
    const res = await gateway.post(url, _input);
    // return success state
    return [res, null];
  } catch (e) {
    // return errors in outliers that can be handled by the UI
    return [null, { name: "Something went wrong" }];
  }
}
