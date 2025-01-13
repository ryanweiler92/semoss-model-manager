import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Flame } from "lucide-react";
import { Button } from "../ui/button";
import {
  shutdownRemoteModel,
  getMyRemoteModels,
} from "../../pixels/remote-engine-pixels";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RemoteModel } from "../../store/slices/remoteModelsSlice";
import { getAvailableEngines } from "../../pixels/pixel-calls";
import {
  updateModels,
  updateAvailableModels,
} from "../../store/slices/remoteModelsSlice";

function ActiveModels() {
  const activeModels = useAppSelector(
    (state) => state.remoteModels.activeModels
  );
  const dispatch = useAppDispatch();

  const runMultipleRefresh = async () => {
    for (let i = 0; i < 5; i++) {
      await refresh();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const handleShutdown = (id: string) => {
    shutdownRemoteModel(id);
    runMultipleRefresh();
  };

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

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        Active Models <Flame />
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeModels.map((model: RemoteModel) => (
            <TableRow key={model.id}>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{model.id}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleShutdown(model.id)}
                >
                  Shutdown
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ActiveModels;
