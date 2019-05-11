import { combineReducers } from 'redux';

import github from './github';
import mapa from './mapa';
import modal from './modal';

export default combineReducers({
  github,
  mapa,
  modal,
});
