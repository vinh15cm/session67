// bookActions.ts
import axios from 'axios';

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';

const addBookRequest = () => ({
  type: ADD_BOOK_REQUEST,
});

const addBookSuccess = (book: any) => ({
  type: ADD_BOOK_SUCCESS,
  payload: book,
});

const addBookFailure = (error: any) => ({
  type: ADD_BOOK_FAILURE,
  payload: error,
});

export const addBook = (formData: any) => {
  return (dispatch: any) => {
    dispatch(addBookRequest());
    axios
      .post("http://localhost:8080/book", formData)
      .then((res) => {
        dispatch(addBookSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addBookFailure(err));
      });
  };
};
