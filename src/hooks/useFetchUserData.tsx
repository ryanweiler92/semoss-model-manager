import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  getUserProjectList,
  getUserInfo,
  getOpenInsights,
  getAvailableEngines,
} from "../pixels/pixel-calls";
import {
  updateProjects,
  updateUserInfo,
  updateOpenInsights,
  updateAvailableEngines,
} from "../store/slices/userSlice";

const useFetchUserData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userInfo, userProjects, openInsights, avilableEngines] =
          await Promise.all([
            getUserInfo(),
            getUserProjectList(),
            getOpenInsights(),
            getAvailableEngines(),
          ]);

        dispatch(updateUserInfo(userInfo));
        dispatch(updateProjects(userProjects));
        dispatch(updateOpenInsights(openInsights));
        dispatch(updateAvailableEngines(avilableEngines));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
};

export default useFetchUserData;
