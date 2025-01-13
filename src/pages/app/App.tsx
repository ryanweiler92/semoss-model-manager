import "../../index.css";
import { useInsight } from "@semoss/sdk-react";
import useFetchUserData from "../../hooks/useFetchUserData";
import Sidebar from "../../components/containers/Sidebar";
import ActiveModels from "../../components/models/activeModels";
import WarmingModels from "../../components/models/warmingModels";
import AvailableModels from "../../components/models/availableModels";

function App() {
  const { isAuthorized } = useInsight();

  const authMessage = isAuthorized
    ? "User is authorized!"
    : "User is not authorized!";

  const noAuthJsx = (
    <div className="text-red-500">
      <p>{authMessage}</p>
      <p>Please log in to continue.</p>
    </div>
  );

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <header className="text-center">{noAuthJsx}</header>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center p-4">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            SEMOSS Remote Model Manager
          </h1>
        </header>
        <AvailableModels />
        <ActiveModels />
        <WarmingModels />
      </div>
    </div>
  );
}

export default App;
