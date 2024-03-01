import { useGetProjectList } from "../actions/getProjectList";
import { createProject } from "../actions/createProject";
import { useAsyncAction } from "~/utilities/hooks/useAsyncAction";
import { ProjectTable } from "../components/ProjectTable";
import { DEFAULT_PROJECT } from "../components";

export default function ProjectOverview() {
  const { data, refresh } = useGetProjectList();
  // isLoading is used to disable the button
  const [create, isLoading] = useAsyncAction(createProject);

  async function onCreate() {
    await create(DEFAULT_PROJECT);
    // refresh cache in the background
    refresh();
  }

  return (
    <div>
      <Button onClick={onCreate} disabled={isLoading}>
        Create new project
      </Button>
      <ProjectTable data={data} />
    </div>
  );
}
