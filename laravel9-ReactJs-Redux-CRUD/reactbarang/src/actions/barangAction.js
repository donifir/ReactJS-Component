import axios from "axios";

export const GET_LIST_BARANG = "GET_LIST_BARANG";
export const POST_BARANG = "POST_BARANG";
export const RESET_STORE = "RESET_STORE";
export const GET_DETAIL_BARANG = "GET_DETAIL_BARANG";
export const PUT_EDIT_BARANG = "PUT_EDIT_BARANG";
export const REMOVE_BARANG = "REMOVE_BARANG";

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};

export const getListBarang = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/barang",
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_LIST_BARANG,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_BARANG,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postBarang = (data) => {
  console.log("log put edit ", data);
  return (dispatch) => {
    dispatch({
      type: POST_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/barang/create",
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        dispatch({
          type: POST_BARANG,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_BARANG,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const getDetailBarang = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_DETAIL_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/barang/" + id.id,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_DETAIL_BARANG,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DETAIL_BARANG,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const putEditBarang = (data) => {
  return (dispatch) => {
    dispatch({
      type: PUT_EDIT_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "POST",
      url: `http://127.0.0.1:8000/api/barang/${data.id}/update`,
      timeout: 120000,
      data: data.formData,
    })
      .then((response) => {
        dispatch({
          type: PUT_EDIT_BARANG,
          payload: {
            laoding: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: PUT_EDIT_BARANG,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const removeBarang = (id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/barang/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        console.log(response.data.message);
        dispatch({
          type: REMOVE_BARANG,
          payload: {
            laoding: false,
            data: response.data.message,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: REMOVE_BARANG,
          payload: {
            laoding: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
