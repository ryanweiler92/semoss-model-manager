import { useEffect } from "react";
import { Button } from "../ui/button";
import { getMyRemoteModels } from "../../pixels/remote-engine-pixels";
import {
  updateModels,
  updateAvailableModels,
} from "../../store/slices/remoteModelsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAvailableEngines } from "../../pixels/pixel-calls";

function Sidebar() {
  const dispatch = useAppDispatch();

  const fetchUserRemoteModels = async () => {
    const userRemoteModels = (await getMyRemoteModels()) as any;
    const warmingModels = userRemoteModels.warmingModels;
    const activeModels = userRemoteModels.activeModels;
    dispatch(updateModels({ warmingModels, activeModels }));
  };

  const fetchAvailableEngines = async () => {
    const availableEngines = (await getAvailableEngines()) as any;
    console.log(availableEngines);
    dispatch(updateAvailableModels(availableEngines));
  };

  const refresh = async () => {
    await fetchUserRemoteModels();
    await fetchAvailableEngines();
  };

  useEffect(() => {
    fetchUserRemoteModels();
    fetchAvailableEngines();
  }, []);

  return (
    <div className="h-screen bg-secondary shadow-lg border-r w-64">
      <div className="p-4">
        <h1 className="text-2xl text-center font-bold">Cfg.Ai</h1>
      </div>
      <nav className="mt-4">
        <div className="flex justify-center">
          <Button onClick={refresh}>Refresh Models</Button>
        </div>
        <ul></ul>
      </nav>
    </div>
  );
}

export default Sidebar;
