import { toast } from 'react-toastify';

export const Types = {
  ADD_REQUEST: 'ADD_REQUEST',
  ADD_SUCCESS: 'ADD_SUCCESS',
  ADD_ERROR: 'ADD_ERROR',
};

/**
 *
 * Actions
 */
export const Creators = {
  addUserRequest: username => ({
    type: Types.ADD_REQUEST,
    payload: { username },
  }),

  addUserSuccess: (data) => {
    toast.success(`Add user ${data.name}!!!`);
    return {
      type: Types.ADD_SUCCESS,
      payload: { data },
    };
  },

  addUserFailure: (error) => {
    toast.error(error);
    return {
      type: Types.ADD_FAILURE,
      payload: { error },
    };
  },

  removeUserRequest: (id) => {
    toast.error(id);
    return {
      type: Types.ADD_FAILURE,
      payload: { id },
    };
  },
};

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function github(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}
