
import { ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE } from './action';

const initialState = {
  loading: false,
  books: [],
  error: null,
};

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload],
      };
    case ADD_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
