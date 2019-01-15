import {Map} from 'immutable';

let initState = Map({
  loading: false,
  tokenId: '',
  userInfo: {
    name: 'test'
  }
});


export default function global (state = initState, action = {}) {
  switch (action.type) {
    case 'INIT_TOKEN' :
      return state.set('tokenId', action.tokenId);
    case 'MASK' :
      return state.set('loading', true);
    case 'UNMASK' :
      return state.set('loading', false);
    case  'UPDATE_USER_INFO': {
      return state.set('userInfo', action.user);
    }
    default :
      return state;
  }
}
