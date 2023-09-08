import { useState } from "react";
import { useGetActivityList } from "../actions/get.activity.js";
import { Pagination } from "~/components/structure/Pagination";
import { ActivityTable } from "./ActivityTable";
import { ActivityCreateModal } from "./ActivityCreateModal";

export default function ActivityOverview({ users }) {
  const [paging, setPaging] = useState({ page: 0, pageSize: 10 });
  const { activities, refresh } = useGetActivities(paging);
  const [showCreateModal, setModal] = useState(false);

  return (
    <div>
      <h1>Activities</h1>
      <button onClick={() => setModal(true)}>Create</button>
      <ActivityTable activities={activities} />
      <Pagination {...paging} onChange={setPaging} />
      {showCreateModal && (
        <ActivityCreateModal
          onClose={() => setModal(false)}
          onComplete={refresh}
        />
      )}
    </div>
  );
}
