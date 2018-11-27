import { combineReducers } from 'redux';
import {
		 GET_TABLE_HEADERS_PENDING,GET_TABLE_HEADERS_FULFILLED,GET_TABLE_HEADERS_REJECTED,
		 GET_TABLE_ROWS_PENDING,GET_TABLE_ROWS_FULFILLED,GET_TABLE_ROWS_REJECTED
		} from '../action-types/configuration';

const initialMetaState = {
	
	GET_TABLE_HEADERS_STATUS:'DEFAULT',
	GET_TABLE_ROWS_STATUS:'DEFAULT'
}

const initialDataState = {
	
	tableHeaders:[],
	tableRows:[]
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	
	switch (action.type) {
		case GET_TABLE_ROWS_PENDING:
			return { ...state, GET_TABLE_ROWS_STATUS: 'PENDING' }
		case GET_TABLE_ROWS_FULFILLED:
			return { ...state, GET_TABLE_ROWS_STATUS: 'SUCCESS' }
		case GET_TABLE_ROWS_REJECTED:
			return { ...state, GET_TABLE_ROWS_STATUS: 'FAILED' }
		case GET_TABLE_HEADERS_PENDING:
			return { ...state, GET_TABLE_HEADERS_STATUS: 'PENDING' }
		case GET_TABLE_HEADERS_FULFILLED:
			return { ...state, GET_TABLE_HEADERS_STATUS: 'SUCCESS' }
		case GET_TABLE_HEADERS_REJECTED:
			return { ...state, GET_TABLE_HEADERS_STATUS: 'FAILED' }
		default:
			return state;
	}
}

function dataReducer(state=initialDataState, action){

	switch (action.type) {
			case GET_TABLE_HEADERS_FULFILLED:
				return { ...state,
					 		tableHeaders:action.payload.tableHeaders
					}	
			case GET_TABLE_ROWS_FULFILLED:
				return { ...state,
					 		tableRows:action.payload.tableRows
					}
			default:
			return state;
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});
