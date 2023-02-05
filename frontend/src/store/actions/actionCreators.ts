import axios from "axios";

export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

const fetchMessagesRequest = () => ({
  type: FETCH_MESSAGES_REQUEST,
});

const fetchMessagesSuccess = (messages: any) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: messages,
});

const fetchMessagesFailure = (error: string) => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: error,
});

export const fetchMessages = () => {
  return (dispatch: any) => {
    dispatch(fetchMessagesRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const messages = response.data;
        dispatch(fetchMessagesSuccess(messages));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchMessagesFailure(errorMessage));
      });
  };
};
