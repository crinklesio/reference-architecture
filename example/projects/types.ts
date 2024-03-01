import { User } from "~/modules/users/types";
import { PROJECT_STATUS } from "./constants";

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export type IProject = {
  name?: string;
  description?: string;
  status: PROJECT_STATUS.Active;
};

export type Project = Required<IProject> & {
  id: string;
  status: ProjectStatus;
  ownerId: string;
};

export type ProjectExtended = Project & {
  owner: User;
};
