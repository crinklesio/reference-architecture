import { User } from "~/modules/users/types";
import { useGetUserList } from "~/modules/users/actions/getUserList";
import { Project, ProjectExtended } from "../types";
import gateway, { useQuery } from "~/api/gateway";
import { store } from "~/store/app";

async function getProjectList(filters: string = "", users: User[] = []) {
  try {
    // an example that shows how business logic like only being able to see your own
    // projects (e.g normal user vs admin) can be implemented in an action
    const onlyOwnProjects = !authorize({ projects: PERMISSIONS.CreateAll });
    let _filters = filters;
    if (onlyOwnProjects && filters.length > 0) filters += ",";
    if (onlyOwnProjects) filters += `owner==${store.user!.id}`;

    const res: Project[] = await gateway.get(`/projects?filters=${_filters}`);
    // transform the request by extending it with users
    // but given it will be wrapped in react hooks, users can be empty
    const data: ProjectExtended[] = res.map((item) => ({
      ...item,
      owner: (users || []).find((user) => user.id === item.ownerId),
    }));
    // return the data
    return [data, null];
  } catch (e) {
    // return errors so the UI can show something in the request went wrong
    return [null, e];
  }
}

export function useGetProjectList(filters) {
  const { data: users } = useGetUserList();
  // assume the first parameter is an async request standardized around API fetching
  // useQuery does all the caching (e.g. https://swr.vercel.app)
  // second and above parameters in this case just feed through to the async function
  // on every call
  return useQuery(getProjectList, filters, users);
}
