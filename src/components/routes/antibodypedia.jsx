import React from "react";
import { Route } from 'react-router-dom';
import AntibodypediaHome from '../../pages/antibodypedia/home';


const Antibodypedia = ({...props}) => {
	return (
		 <React.Fragment>
	        <Route exact path={`${props.match.url}`} component={AntibodypediaHome} />
    	 </React.Fragment>
	)
}

export default Antibodypedia;