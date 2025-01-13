import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";

const initialState = {
  userInfo: {
    id: "",
    name: "",
    email: "",
    username: "",
  } as User,
  projects: [],
  openInsights: [],
  embeddingEngines: [],
  textGenEngines: [],
  imageGenEngines: [],
};

function extractUserInfo(userInformation: Record<string, any>): any {
  const values = Object.values(userInformation);
  if (values.length === 1) {
    const info = values[0];
    return {
      id: info.id,
      name: info.name,
      email: info.email,
      username: info.username,
    };
  }
  throw new Error("Object does not have exactly one key-value pair");
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = extractUserInfo(action.payload);
    },
    updateOpenInsights: (state, action) => {
      state.openInsights = action.payload;
    },
    updateAvailableEngines: (state, action) => {
      state.embeddingEngines = action.payload.filter(
        (engine: any) =>
          engine.app_subtype === "EMBEDDED" || engine.type === "TEXT_EMBEDDINGS"
      );
      state.textGenEngines = action.payload.filter(
        (engine: any) =>
          engine.app_subtype === "TEXT_GENERATION" ||
          engine.app_subtype === "OPEN_AI"
      );
      state.imageGenEngines = action.payload.filter(
        (engine: any) => engine.app_subtype === "IMAGE"
      );
    },
  },
});

export const {
  updateProjects,
  updateUserInfo,
  updateOpenInsights,
  updateAvailableEngines,
} = userSlice.actions;
export default userSlice.reducer;
