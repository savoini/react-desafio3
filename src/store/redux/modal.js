export const Types = {
  OPEN_MODAL: '@modal/OPEN_MODAL',
  CLOSE_MODAL: '@modal/CLOSE_MODAL',
};

export const Creators = {
  openModal: () => ({
    type: Types.OPEN_MODAL,
    payload: {},
  }),

  closeModal: () => ({
    type: Types.CLOSE_MODAL,
    payload: {},
  }),
};

const INITIAL_STATE = {
  open: false,
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_MODAL:
      return { open: true };
    case Types.CLOSE_MODAL:
      return { open: false };
    default:
      return state;
  }
}
