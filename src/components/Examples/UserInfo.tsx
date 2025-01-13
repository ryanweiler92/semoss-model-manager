import { useAppDispatch } from "../../store/hooks";
import { getUserInfo } from "../../pixels/pixel-calls";
import { updateUserInfo } from "../../store/slices/userSlice";
import { Button } from "../ui/button";

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    const userInfo = await getUserInfo();
    dispatch(updateUserInfo(userInfo));
    console.log(userInfo);
  };

  return (
    <div className="mt-4">
      <Button onClick={handleClick}>Get User Info</Button>
    </div>
  );
};

export default UserInfo;
