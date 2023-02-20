import axios from "axios";

export const RESET_STORE = "RESET_STORE";
export const GET_LIST_SUPLIER = "GET_LIST_SUPLIER";
export const POST_DATA_SUPLIER = "POST_DATA_SUPLIER";
export const GET_DETAIL_SUPLIER = "GET_DETAIL_SUPLIER";
export const POST_EDIT_SUPLIER = "POST_EDIT_SUPLIER";
export const DELETE_DATA_SUPLIER = "DELETE_DATA_SUPLIER";

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};

export const getListSuplier = () => {
  // console.log("1.masuk suplier action");
  return (dispatch) => {
    dispatch({
      type: GET_LIST_SUPLIER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/supliers",
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_LIST_SUPLIER,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_SUPLIER,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const PostDataSuplier = (data) => {
  // console.log("1.masuk suplier action");
  return (dispatch) => {
    dispatch({
      type: POST_DATA_SUPLIER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/suplier/create",
      timeout: 120000,
      data:data,
    })
      .then((response) => {
        dispatch({
          type: POST_DATA_SUPLIER,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        dispatch({
          type: POST_DATA_SUPLIER,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const getDetailSuplier = (id) => {
  // console.log(id);
  return (dispatch) => {
    dispatch({
      type: GET_DETAIL_SUPLIER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/suplier/"+id.id,
      timeout: 120000
    })
      .then((response) => {
        // console.log(response);
        dispatch({
          type: GET_DETAIL_SUPLIER,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        dispatch({
          type: GET_DETAIL_SUPLIER,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const PostEditSuplier = (data) => {
  // console.log("1.masuk suplier action");
  return (dispatch) => {
    dispatch({
      type: POST_EDIT_SUPLIER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "PUT",
      url: "http://127.0.0.1:8000/api/suplier/"+data.id,
      timeout: 120000,
      data:data,
    })
      .then((response) => {
        dispatch({
          type: POST_EDIT_SUPLIER,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        dispatch({
          type: POST_EDIT_SUPLIER,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const deleteDataSuplier = (id) => {
  // console.log(id);
  return (dispatch) => {
    dispatch({
      type: DELETE_DATA_SUPLIER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "DELETE",
      url: "http://127.0.0.1:8000/api/suplier/"+id,
      timeout: 120000
    })
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DELETE_DATA_SUPLIER,
          payload: {
            laoding: false,
            data: response.data.message,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        dispatch({
          type: DELETE_DATA_SUPLIER,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

