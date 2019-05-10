import { all, takeLatest } from 'redux-saga/effects';

import { addUserGithub } from './github';
import { Types as GitHubTypes } from '../redux/github';

export default function* rootSaga() {
  yield all([takeLatest(GitHubTypes.ADD_REQUEST, addUserGithub)]);
}
