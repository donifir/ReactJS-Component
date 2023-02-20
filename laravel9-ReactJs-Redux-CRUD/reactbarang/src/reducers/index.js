import BarangReducer from "./barang/index";
import SuplierReducer from "./suplier/index";
import { combineReducers } from "redux";

export default combineReducers({
  BarangReducer,
  SuplierReducer,
});
