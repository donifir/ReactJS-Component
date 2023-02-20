import {
  GET_LIST_BARANG,
  POST_BARANG,
  RESET_STORE,
  GET_DETAIL_BARANG,
  PUT_EDIT_BARANG,
  REMOVE_BARANG
} from "../../actions/barangAction";

const initialState = {
  getListBarangLoading: false,
  getListBarangResult: false,
  getListBarangError: false,

  postBarangLoading: false,
  postBarangResult: false,
  postBarangError: false,

  getDetailBarangLoading: false,
  getDetailBarangResult: false,
  getDetailBarangError: false,

  putEditBarangLoading: false,
  putEditBarangResult: false,
  putEditBarangError: false,

  removeBarangLoading: false,
  removeBarangResult: false,
  removeBarangError: false,
};

const barang = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE:
      return {
        state: undefined,
      };

    case GET_LIST_BARANG:
      return {
        ...state,
        getListBarangLoading: action.payload.loading,
        getListBarangResult: action.payload.data,
        getListBarangError: action.payload.errorMessage,
      };

    case POST_BARANG:
      return {
        ...state,
        postBarangLoading: action.payload.loading,
        postBarangResult: action.payload.data,
        postBarangError: action.payload.errorMessage,
      };

    case GET_DETAIL_BARANG:
      return {
        ...state,
        getDetailBarangLoading: action.payload.loading,
        getDetailBarangResult: action.payload.data,
        getDetailBarangError: action.payload.errorMessage,
      };

      case PUT_EDIT_BARANG:
      return {
        ...state,
        removeBarangLoading: action.payload.loading,
        removeBarangResult: action.payload.data,
        removeBarangError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
export default barang;
