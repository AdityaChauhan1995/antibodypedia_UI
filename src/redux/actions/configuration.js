import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;


export const getTableHeaders = () => {
	return dispatch => {
		dispatch({
			type: 'GET_TABLE_HEADERS',
			payload: _getTableHeaders()
		})
	}
}

const _getTableHeaders = () => {
	// mockknig response
	  return new Promise((resolve, reject) => {
	  	resolve(require('../../mock/tableHeader.json'));
	  })
//	return axios.get(SUPPORTING_CENTER_INFO_URL);
}


export const getTableRows = () => {
	return dispatch => {
		dispatch({
			type: 'GET_TABLE_ROWS',
			payload: _getTableRows()
		})
	}
}

const _getTableRows = () => {
	// mockknig response
	  return new Promise((resolve, reject) => {
	  	resolve(require('../../mock/tableRows.json'));
	  })
//	return axios.get(SUPPORTING_CENTER_INFO_URL);
}