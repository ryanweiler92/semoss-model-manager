import { useAppDispatch } from "../../store/hooks";
import { getUserProjectList } from "../../pixels/pixel-calls";
import { updateProjects } from "../../store/slices/userSlice";
import { Button } from "../ui/button";

const UserProjects = () => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    const projects = await getUserProjectList();
    dispatch(updateProjects(projects));
    console.log(projects);
  };

  return (
    <div className="mt-4">
      <Button onClick={handleClick}>Get User Projects</Button>
    </div>
  );
};

export default UserProjects;
