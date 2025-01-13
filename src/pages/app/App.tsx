import "../../index.css";
import { useInsight } from "@semoss/sdk-react";
import useFetchUserData from "../../hooks/useFetchUserData";
import Sidebar from "../../components/containers/Sidebar";

function App() {
  const { isAuthorized } = useInsight();
  useFetchUserData();

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
          <h1 className="text-4xl font-bold mb-2">Welcome to My App</h1>
        </header>
      </div>
    </div>
  );
}

export default App;
