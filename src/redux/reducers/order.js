import { combineReducers } from 'redux';
import {

} 
		 from '../action-types/order';


const initialMetaState = {

}

const initialDataState = {
	
}


function metaReducer(state=initialMetaState, action){
	switch(action.type){
		default:
			return state;
	}
}

function dataReducer(state=initialDataState, action){
	switch(action.type){
		
		default:
			return state;
	}
}

export default combineReducers({
  meta: metaReducer,
  data: dataReducer
});
