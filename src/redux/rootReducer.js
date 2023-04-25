import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import SettingsReducer from "./slices/settings";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const settingsPersistConfig = {
  key: "user",
  storage,
  keyPrefix: "redux-",
  whitelist: ["currency", "symbol", "mode", "language"],
};
const rootReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
});

export { rootPersistConfig, rootReducer };
