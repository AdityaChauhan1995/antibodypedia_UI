import { combineReducers } from 'redux';

const initialMetaState = {
	
}

const initialDataState = {
}

function metaReducer(state=initialMetaState, action){
	// listen to only the action interested for this reducer
	switch(action.type){
		default:
			return {...state};	
	}
}

function dataReducer(state=initialDataState, action){
	// listen to only the action interested for this reducer
	switch(action.type){
		default:
			return {...state};	
	}
}

export default combineReducers({
  meta: metaReducer,
  data: dataReducer
});