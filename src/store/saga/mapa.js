import { put } from 'redux-saga/effects';
import { Creators as ModalActions } from '../redux/modal';
import { Creators as MapaActions } from '../redux/mapa';

export function* addPoint(action) {
  try {
    const { payload } = action;

    yield put(MapaActions.addPointSuccess(payload.latitude, payload.longitude));

    yield put(ModalActions.openModal());
  } catch (error) {
    console.log(error);
    yield put(ModalActions.closeModal());
  }
}
