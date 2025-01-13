import { createSlice } from "@reduxjs/toolkit";
import { getMyRemoteModels } from "../../pixels/remote-engine-pixels";

export interface RemoteModel {
  id: string;
  name: string;
  state: string;
}

const initialState = {
  warmingModels: [],
  activeModels: [],
  availableModels: [],
};

const filterAvailableModels = (
  availableModels: any,
  warmingModels: RemoteModel[],
  activeModels: RemoteModel[]
) => {
  const availableRemoteModels = availableModels.filter(
    (model: any) =>
      model.description === "remote_model\n" ||
      model.description === "remote_model"
  );

  const filteredModels = availableRemoteModels.filter((model: any) => {
    const isWarming = warmingModels.some(
      (warmingModel) => warmingModel.id === model.app_id
    );
    const isActive = activeModels.some(
      (activeModel) => activeModel.id === model.app_id
    );
    return !isWarming && !isActive;
  });

  return filteredModels;
};

export const remoteModelsSlice = createSlice({
  name: "remoteModels",
  initialState,
  reducers: {
    updateWarmingModels: (state, action) => {
      state.warmingModels = action.payload;
    },
    updateActiveModels: (state, action) => {
      state.activeModels = action.payload;
    },
    updateModels: (state, action) => {
      state.warmingModels = action.payload.warmingModels;
      state.activeModels = action.payload.activeModels;
    },
    updateAvailableModels: (state, action) => {
      state.availableModels = filterAvailableModels(
        action.payload,
        state.warmingModels,
        state.activeModels
      );
    },
  },
});

export const {
  updateWarmingModels,
  updateActiveModels,
  updateModels,
  updateAvailableModels,
} = remoteModelsSlice.actions;
export default remoteModelsSlice.reducer;
