import { all, takeLatest } from 'redux-saga/effects';

import { addUserGithub } from './github';
import { Types as GitHubTypes } from '../redux/github';

import { addPoint } from './mapa';
import { Types as MapaTypes } from '../redux/mapa';

export default function* rootSaga() {
  yield all([
    takeLatest(GitHubTypes.ADD_REQUEST, addUserGithub),
    takeLatest(MapaTypes.ADD_REQUEST, addPoint),
  ]);
}
