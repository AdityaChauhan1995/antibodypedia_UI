import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const API_TOKEN=process.env.REACT_APP_API_TOKEN;
const POST_DATA = `${API_BASE}/postOrderSubmission`;
const POST_APPROVAL_DATA =`${API_BASE}/postOrderApproval`;
const POST_RESUB_DATA = `${API_BASE}/postOrderReSubmission`;

const REGISTRATION_DETAILS_URL = (easMasterRegId) => `${API_BASE}/getRegDetailsFromMaster/${easMasterRegId}/APPROVAL_MODE`;
const FETCH_LINE_DETAILS = (easMasterRegId,mode) => `${API_BASE}/getLineDetails/${easMasterRegId}/${mode}`;
const GET_FUND_AMOUNT=(vsn, easMasterRegId)=>`${API_BASE}/getFundAmount/${vsn}/${easMasterRegId}`;
const CHECK_ELIGIBILITY_FUND_DEVICE=(vsn, productCat)=>`${API_BASE}/checkEligibilityforFundDevice/${vsn}/${productCat}`;
const GET_RATEPLAN_DATA=(msisdn, type, virtualServiceNo)=>`${API_BASE}/getRatePlanData/${msisdn}/${type}/${virtualServiceNo}`
const GET_CORP_OWNER_INFO =(brn,companyName)=>`${API_BASE}/getCorpAccountOwnerDetails/${brn}/${companyName}`;


// actions
const _setRegistrationTypeInfo = (bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo) => {
	return new Promise((resolve, reject) => {
		resolve({ bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo });
	})
}

const _setProductOrderInfo = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount) => {
	return new Promise((resolve, reject) => {
		resolve({ regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount });
	})
}

const _setDeviceFundInfo = (fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld) => {
	return new Promise((resolve, reject) => {
		resolve({ fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld });
	})
}

const _setAddressContactDetails = (billingAddress, deliveryAddress, picDetails) => {
	return new Promise((resolve, reject) => {
		resolve({ billingAddress, deliveryAddress, picDetails });
	})
}

const _setApprovalRegistrationDetails = (registrationDetails) => {
	return new Promise((resolve, reject) => {
		resolve({ registrationDetails });
	})
}
const _unsetOrderData = (data) => {
	return new Promise((resolve, reject) => {
		resolve({ data });
	})
}
const _setApprovalSubmissionInfo = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
	totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission) => {
	return new Promise((resolve, reject) => {
		resolve({
			marketCode, accountCategory, parentId, hierarchyId, collectionCode,
			authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
			totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission
		});
	})
}

const _postOrderData = (order) => {
	return axios.post(POST_DATA, order);
}

const _postApprovalOrderData = (order) => {
	return axios.post(POST_APPROVAL_DATA, order);
}
const _getRegistrationDetails = (easMasterRegId) => {

	return axios.get(REGISTRATION_DETAILS_URL(easMasterRegId));
}
const _getMsisdnDetails = (easMasterRegId, mode) => {
	return axios.get(FETCH_LINE_DETAILS(easMasterRegId, mode));
}
const _setLineDetails = (todos, crpLineCount ) => {
	return new Promise((resolve, reject) => {
		resolve({ todos, crpLineCount });
	})
}
const _setMsisdnDetails = (msisdnList ) => {
	return new Promise((resolve, reject) => {
		resolve({ msisdnList });
	})
}
const _setDeviceDetails = (addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount,  previousFundAmountUsed, previousFundAmountLeft ) => {
	return new Promise((resolve, reject) => {
		resolve({ addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft });
	})
}
const _setApprovalFunds = (totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed) => {
	return new Promise((resolve, reject) => {
		resolve({ totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed});
	})
}
// action creators
export const setRegistrationTypeInfo = (bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo) => {
	return dispatch => {
		dispatch({
			type: 'SET_REG_TYPE',
			payload: _setRegistrationTypeInfo(bundleType, orderCategory, brn, isMsisdnVsn, msisdnVsn, selectedVSN, companyDeposit, advancePayment, brnInfo)
		})
	}
}

export const setProductOrderInfo = (regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER',
			payload: _setProductOrderInfo(regType, regTypeId, ratePlan, deviceContract, mobileNumber, simCardNo, simType, phoneModel, donorType, donorAccountNo, todos, msisdnList, ratePlanId, vasList, iddList,crpLineCount)
		})
	}
}

export const setDeviceFundInfo = (fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld) => {
	return dispatch => {
		dispatch({
			type: 'SET_DEVICE_FUND',
			payload: _setDeviceFundInfo(fundDeviceList, fundSummary, msisdnList, addedDevices, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, totalApprovedAmount, deviceFundsOld)
		})

	}
}


export const setAddressContactDetails = (billingAddress, deliveryAddress, picDetails) => {
	return dispatch => {
		dispatch({
			type: 'SET_ADDRESS_CONTACT_DETAILS',
			payload: _setAddressContactDetails(billingAddress, deliveryAddress, picDetails)
		})

	}
}



const _setSubmissionInfo = (dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
	cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user) => {
	return new Promise((resolve, reject) => {
		resolve({
			dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
			cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user
		});
	})
}
const _getFundAmount = (vsn, easMasterRegId) => {
	return axios.get(GET_FUND_AMOUNT(vsn, easMasterRegId));
}

const _getCorpAccountOwnerDetails = (brn,companyName) => {
	return axios.get(GET_CORP_OWNER_INFO(brn,companyName));
}
export const setSubmissionInfo = (dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
	cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user) => {
	return dispatch => {
		dispatch({
			type: 'SET_SUBMISSION_INFO',
			payload: _setSubmissionInfo(dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter, cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user)
		})

	}
}


export const postOrderData =(data)=>{
	return dispatch => {
			dispatch({
				type: 'SET_ORDER_SUBMISSION',
				payload: _postOrderData(data)
			})

		}
}

export const setApprovalRegistrationDetails = (registrationDetails) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_REG_TYPE',
			payload: _setApprovalRegistrationDetails(registrationDetails)
		})

	}
}

export const unsetOrderData = (data) => {
	return dispatch => {
		dispatch({
			type: 'UNSET_ORDER_DATA',
			payload: _unsetOrderData(data)
		})


	}
}

export const setApprovalSubmission = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
	totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_SUBMISSION_INFO',
			payload: _setApprovalSubmissionInfo(marketCode, accountCategory, parentId, hierarchyId, collectionCode,
				authorisedSignatoryDropdownValue, billable, companyDepositAmount, totalDeposit, advancePaymentAmount, totalAdvPayment,
				totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, noOfLines, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, authDetail, tempUploadRegId, allowResubmission)
		})
	}
}


export const postApprovalOrderData =(data)=>{
	return dispatch => {
			dispatch({
				type: 'SET_ORDER_APPROVAL',
				payload: _postApprovalOrderData(data)
			})

		}
}
export const getRegistrationDetails = (easMasterRegId) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_REGISTRATION_DETAILS',
			payload: _getRegistrationDetails(easMasterRegId)
		})
	}
}
export const getMsisdnDetails = (easMasterRegId, mode) => {
	return dispatch => {
		dispatch({
			type: 'FETCH_LINE_DETAILS',
			payload: _getMsisdnDetails(easMasterRegId, mode)
		})
	}
}


const _setCompanyInformation = (documentUploadItems,lineCount,crpLineCount) => {
	return new Promise((resolve, reject) => {
		resolve({documentUploadItems,lineCount,crpLineCount});
	})
}

export const setCompanyInformation = (documentUploadItems,lineCount,crpLineCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_COMPANY_INFORMATION',
			payload: _setCompanyInformation(documentUploadItems,lineCount,crpLineCount)
		})
	}
}
export const setLineDetails = (todos,crpLineCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_LINE_DETAILS',
			payload: _setLineDetails(todos,crpLineCount)
		})
	}
}

export const setMsisdnDetails = (msisdnList) => {
	return dispatch => {
		dispatch({
			type: 'SET_MSISDN_DETAILS',
			payload: _setMsisdnDetails(msisdnList)
		})
	}
}

export const setDeviceDetails = (addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountUsed, previousFundAmountLeft) => {
	return dispatch => {
		dispatch({
			type: 'SET_DEVICE_DETAILS',
			payload: _setDeviceDetails(addedDevices, totalPrice, totalQuantity, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount,  previousFundAmountUsed, previousFundAmountLeft)
		})
	}
}

export const setApprovalFunds = (totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_FUNDS',
			payload: _setApprovalFunds(totalApprovedAmount, deviceFundUsed, deviceFundLeft, amountPayable, tax, previousFundAmount, previousFundAmountLeft, previousFundAmountUsed)
		})
	}
}

export const setSubmissionInfoPrevious =(dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
	cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user)=>{
	return dispatch => {
		dispatch({
			type: 'SET_SUBMISSION_INFO_PREVIOUS',
			payload: _setSubmissionInfo(dealerRemarks, accountManagerCode, salesmanCode, salesmanName, supportingCenter,
			cmssID, cmssFileName, cmssRegId, customerSignDate, tnc, user)
		})
	}
}
export const getFundAmount = (vsn, easMasterRegId) =>{
	return dispatch => {
		dispatch({
			type: 'GET_FUND_AMOUNT',
			payload: _getFundAmount(vsn, easMasterRegId)
		})
	}
}
export const getCorpAccountOwnerDetails = (brn,companyName) =>{
	return dispatch => {
		dispatch({
			type: 'GET_CORP_OWNER_INFO',
			payload: _getCorpAccountOwnerDetails(brn,companyName)
		})
	}
}
const _setApprovalSubmissionInfoPrevious = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
	totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, 
	totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user,
	 authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue) => {
	return new Promise((resolve, reject) => {
		resolve({
			marketCode, accountCategory, parentId, hierarchyId, collectionCode,
			authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
			totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, 
			totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, 
			authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue
		});
	})
}

export const setApprovalSubmissionPrevious = (marketCode, accountCategory, parentId, hierarchyId, collectionCode,
	authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
	totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue, 
	totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user, 
	authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue) => {
	return dispatch => {
		dispatch({
			type: 'SET_APPROVAL_SUBMISSION_INFO_PREVIOUS',
			payload: _setApprovalSubmissionInfoPrevious(marketCode, accountCategory, parentId, hierarchyId, collectionCode,
				authorisedSignatoryDropdownValue, isBillableChecked, deposit, totalDeposit, advancePaymentAmount, totalAdvanceDeposit,
				totalDeviceTopUp, DeviceTopUpGST, totalPayment, action, cmssNo, approvalRemarks, assignedToDropdownValue,
				 totalLinesDeposit, orgAdvancePayment, orgDeposit, billableAccountNumber, orderCategory, rejectionReason, user,
				  authDetail, tempUploadRegId, allowResubmission,totalLinesadvancePayment,reviewDropdownValue,reasonCodeDropdownValue)
		})
	}
}
const _setResubmissionRegistrationInfo = (companyDeposit, advancePayment) => {
	return new Promise((resolve, reject) => {
		resolve({companyDeposit, advancePayment});
	})
}

export const setResubmissionRegistrationInfo = (companyDeposit, advancePayment) => {
	return dispatch => {
		dispatch({
			type: 'SET_RESUBMISSION_REGISTRATION_INFO',
			payload: _setResubmissionRegistrationInfo(companyDeposit, advancePayment)
		})
	}
}

const _postResubOrderData = (order) => {
	return axios.post(POST_RESUB_DATA, order);
} 
export const postResubOrderData =(data)=>{
	return dispatch => {
			dispatch({
				type: 'SET_RESUBMISSION_ORDER_SUBMISSION',
				payload: _postResubOrderData(data)
			})

		}
}

const _validateOldMsidns = (validateOldMsisdn,todos) => {
	return new Promise((resolve, reject) => {
		resolve({validateOldMsisdn,todos});
	})
}

const _setProductOrderInfoPrev = (totalMemberString) => {
	return new Promise((resolve, reject) => {
		resolve({totalMemberString});
	})
}

const _checkEligibilityForFundDevice = (vsn, productCat) => {
	return axios.get(CHECK_ELIGIBILITY_FUND_DEVICE(vsn, productCat));
}

export const validateOldMsidns = (validateOldMsisdn,todos) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_OLD_MSISDNS',
			payload: _validateOldMsidns(validateOldMsisdn,todos)
		})
	}
}

export const setProductOrderInfoPrev = (totalMemberString) => {
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_ORDER_PREVIOUS',
			payload: _setProductOrderInfoPrev(totalMemberString)
		})
	}
}

export const getRatePlanData = (msisdn, type, virtualServiceNo) => {
	return dispatch => {
		dispatch({
			type: 'GET_ADD_ON_DATA_VSN',
			payload: _getRatePlanData(msisdn, type, virtualServiceNo)
		})
	}
}
const _getRatePlanData = (msisdn, type, virtualServiceNo) => {
	return axios.get(GET_RATEPLAN_DATA(msisdn, type, virtualServiceNo));
}

export const checkEligibilityForFundDevice = (vsn, productCat) => {
	return dispatch => {
		dispatch({
			type: 'SET_ELIGIBILITY_CHECK',
			payload: _checkEligibilityForFundDevice(vsn, productCat)
		})
	}
}
const _setCompanyInformationPrev = (documentUploadItems,lineCount,crpLineCount) => {
	return new Promise((resolve, reject) => {
		resolve({documentUploadItems,lineCount,crpLineCount});
	})
}

export const setCompanyInformationPrev = (documentUploadItems,lineCount,crpLineCount) => {
	return dispatch => {
		dispatch({
			type: 'SET_COMPANY_INFORMATION_PREV',
			payload: _setCompanyInformationPrev(documentUploadItems,lineCount,crpLineCount)
		})
	}
}
const _setRatePlanBlank = (ratePlan) => {
	return new Promise((resolve, reject) => {
		resolve({ratePlan});
	})
}

export const setRatePlanBlank = (ratePlan) => {
	return dispatch => {
		dispatch({
			type: 'SET_RATEPLAN_BLANK',
			payload: _setRatePlanBlank(ratePlan)
		})
	}
}