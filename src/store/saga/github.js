import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';
import { Creators as GitHubActions } from '../redux/github';

export function* addUserGithub(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.username}`);

    const isDuplicate = yield select(state => state.github.data.find(user => user.id === data.id));

    const mapa = yield select(state => state.mapa);

    if (isDuplicate) {
      yield put(GitHubActions.addUserFailure('Erro ao buscar usuário'));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.name,
        login: data.login,
        location: data.location,
        avatar: data.avatar_url,
        latitude: mapa.latitude,
        longitude: mapa.longitude,
      };

      yield put(GitHubActions.addUserSuccess(repositoryData));
    }
  } catch (error) {
    yield put(GitHubActions.addUserFailure(`Erro ao adicionar usuário: ${error.message}`));
  }
}
