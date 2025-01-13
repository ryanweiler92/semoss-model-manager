import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { SunSnow } from "lucide-react";
import { Button } from "../ui/button";
import { shutdownRemoteModel } from "../../pixels/remote-engine-pixels";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RemoteModel } from "../../store/slices/remoteModelsSlice";

function WarmingModels() {
  const warmingModels = useAppSelector(
    (state) => state.remoteModels.warmingModels
  );
  const dispatch = useAppDispatch();

  const handleShutdown = (id: string) => {
    shutdownRemoteModel(id);
  };

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        Warming Models <SunSnow />
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
          {warmingModels.map((model: RemoteModel) => (
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

export default WarmingModels;
