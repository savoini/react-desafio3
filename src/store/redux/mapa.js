export const Types = {
  ADD_REQUEST: '@mapa/ADD_REQUEST',
  ADD_SUCCESS: '@mapa/ADD_SUCCESS',
  CLEAR_REQUEST: '@mapa/CLEAR_REQUEST',
};

export const Creators = {
  addPointRequest: (latitude, longitude) => ({
    type: Types.ADD_REQUEST,
    payload: { latitude, longitude },
  }),

  addPointSuccess: (latitude, longitude) => ({
    type: Types.ADD_SUCCESS,
    payload: { latitude, longitude },
  }),

  clearPoint: () => ({
    type: Types.CLEAR_REQUEST,
    payload: {},
  }),
};

const INITIAL_STATE = {
  longitude: 0,
  latitude: 0,
};

export default function mapa(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_SUCCESS:
      return { latitude: action.payload.latitude, longitude: action.payload.longitude };
    case Types.CLEAR_REQUEST:
      return INITIAL_STATE;
    default:
      return state;
  }
}
