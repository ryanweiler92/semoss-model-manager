import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Snowflake } from "lucide-react";
import { Button } from "../ui/button";
import {
  startRemoteModel,
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
import {
  updateModels,
  updateAvailableModels,
} from "../../store/slices/remoteModelsSlice";
import { getAvailableEngines } from "../../pixels/pixel-calls";

function AvailableModels() {
  const dispatch = useAppDispatch();
  const availableModels = useAppSelector(
    (state) => state.remoteModels.availableModels
  );

  const runMultipleRefresh = async () => {
    for (let i = 0; i < 10; i++) {
      await refresh();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const handleStart = (id: string) => {
    startRemoteModel(id);
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
        Available Models <Snowflake />
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
          {availableModels.map((model: any) => (
            <TableRow key={model.app_id}>
              <TableCell className="font-medium">
                {model.database_name}
              </TableCell>
              <TableCell>{model.app_id}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleStart(model.app_id)}>
                  Start
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AvailableModels;
