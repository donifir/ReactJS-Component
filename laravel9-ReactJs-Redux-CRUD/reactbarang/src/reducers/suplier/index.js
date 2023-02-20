import {
  RESET_STORE,
  GET_LIST_SUPLIER,
  POST_DATA_SUPLIER,
  POST_EDIT_SUPLIER,
  GET_DETAIL_SUPLIER,
  DELETE_DATA_SUPLIER,
} from "../../actions/suplierAction";

const initialState = {
  getListSuplierLoading: false,
  getListSuplierResult: false,
  getListSuplierError: false,

  PostDataSuplierLoading: false,
  PostDataSuplierResult: false,
  PostDataSuplierError: false,

  getDetailSuplierLoading: false,
  getDetailSuplierResult: false,
  getDetailSuplierError: false,

  PostEditSuplierLoading: false,
  PostEditSuplierResult: false,
  PostEditSuplierError: false,

  deleteDataSuplierLoading: false,
  deleteDataSuplierResult: false,
  deleteDataSuplierError: false,
};

const suplier = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE:
      return {
        state: undefined,
      };

    case GET_LIST_SUPLIER:
      return {
        ...state,
        getListSuplierLoading: action.payload.loading,
        getListSuplierResult: action.payload.data,
        getListSuplierError: action.payload.errorMessage,
      };

      case POST_DATA_SUPLIER:
      return {
        ...state,
        PostDataSuplierLoading: action.payload.loading,
        PostDataSuplierResult: action.payload.data,
        PostDataSuplierError: action.payload.errorMessage,
      };

      case GET_DETAIL_SUPLIER:
      return {
        ...state,
        getDetailSuplierLoading: action.payload.loading,
        getDetailSuplierResult: action.payload.data,
        getDetailSuplierError: action.payload.errorMessage,
      };

      case POST_EDIT_SUPLIER:
      return {
        ...state,
        PostEditSuplierLoading: action.payload.loading,
        PostEditSuplierResult: action.payload.data,
        PostEditSuplierError: action.payload.errorMessage,
      };

      case DELETE_DATA_SUPLIER:
      return {
        ...state,
        deleteDataSuplierLoading: action.payload.loading,
        deleteDataSuplierResult: action.payload.data,
        deleteDataSuplierError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
export default suplier;
