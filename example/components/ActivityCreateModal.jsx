import { useState } from "react";
import { useCreateActivity } from "../actions/create.activity";

export default function ActivityCreateModal({ onClose, onComplete }) {
  const [create, isLoading] = useCreateActivity();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState();

  async function onSubmit() {
    const [result, errors] = await create(data);
    if (errors) setErrors(errors);
    else {
      onComplete(result);
      onClose();
    }
  }

  return null;
}
