import axios from "axios";
import { FETCH_USER } from "./types";
import { SEARCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// export const searchUser = async dispatch => {
//   const res = await axios.get("/api/fetchuser");
//   console.log(res.data);
// };
