import React, { Component } from 'react';
import '../../Index.css';
import {
	Grid, Message, Input, Select, Checkbox, Segment, Container, Icon, Form, Dropdown,
	Confirm, Table, Menu, Tab, Breadcrumb, Button,Image
} from "semantic-ui-react";
import { PleaseWait } from '../../components/common/dimmer';
import { connect } from 'react-redux';
import { getCorpAccountOwnerDetails } from '../../redux/actions/order';
import {getTableHeaders,getTableRows} from '../../redux/actions/configuration';


class AntibodypediaHome extends Component {

	constructor(props) {
		super(props);
		const { url } = this.props.match;
		this.state = {
			showDimmer: false,
			corpInfoList: props.corpInfoList,
			brn: '',
			companyName: '',
			corpOwnerIndex: 1,
			corpInfoIndexFirst: 1,
			corpInforIndexLast: null,
			infoValueCurrent: 1,
			infoCurrentPage: 1,
			corpOwnerListValue: [],
			caCurrentPage: 1,
			caTodosPerPage: 10,
			caIndexOfFirstTodo: null,
			caIndexOfLastTodo: null,
			caCurrentTodos: null,
			caFirstIndexCurrentPage: 1,
			validationResult: {
				status: 'SUCCESS',
				message: '',
			},
			stateOptions: [{ key: '1', value: 'AND', text: 'AND' }, { key: '2', value: 'NOT', text: 'NOT' }],
			tableHeaders:[],
			tableRows:[],
			displayTable:false
		};

	}

	componentWillMount(){
		this.props.getTableHeaders();
		
	}
	
	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}
	handleItemClick = () => {
		console.log("clicked");
	}

	handleClick = (type) => {
		this.setState({showDimmer: true});
		this.props.getTableRows();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.GET_TABLE_HEADERS_STATUS !== 'SUCCESS' &&
		nextProps.GET_TABLE_HEADERS_STATUS === 'SUCCESS') {
			console.log(nextProps.tableHeaders);
			this.setState({tableHeaders:nextProps.tableHeaders});
		}
		else if (this.props.GET_TABLE_ROWS_STATUS !== 'SUCCESS' &&
		nextProps.GET_TABLE_ROWS_STATUS === 'SUCCESS') {
			console.log(nextProps.tableRows);
			this.setState({tableRows:nextProps.tableRows,showDimmer:false,displayTable:true});
		}
		else if (this.props.GET_CORP_OWNER_INFO_STATUS !== 'SUCCESS' &&
			nextProps.GET_CORP_OWNER_INFO_STATUS === 'SUCCESS') {
			if (nextProps.corpInfoList != null) {
				let tempCorpOwnerListValue = nextProps.corpInfoList;
				this.setState({ corpOwnerListValue: tempCorpOwnerListValue });
				if (nextProps.corpInfoList[0].errorCode === null) {
					this.setState({
						validationResult: {
							status: 'SUCCESS',
							message: ''
						}
					})
				} else if (nextProps.corpInfoList[0].errorCode === "1") {
					this.setState({
						validationResult: {
							status: 'FAILURE',
							message: nextProps.corpInfoList[0].errorMessage[0]
						}
					})
				}
				this.setState({ showDimmer: false });
				this.setState({
					caCurrentPage: 1,
					caFirstIndexCurrentPage: 1,
				});
			}
		}

		if (this.props.GET_CORP_OWNER_INFO_STATUS !== 'FAILED' &&
			nextProps.GET_CORP_OWNER_INFO_STATUS === 'FAILED') {
			this.setState({
				corpOwnerListValue: [], showDimmer: false,
				validationResult: {
					status: 'FAILURE',
					message: 'We have encounted some error while fetching data.',
				}
			});
			this.setState({
				caCurrentPage: 1,
				caFirstIndexCurrentPage: 1,
			});
		}
	}
	render() {
		let { brn, companyName, corpOwnerIndex, corpInfoIndexFirst, corpInforIndexLast, corpOwnerListValue,
			corpInfoList, infoCurrentPage, infoValueCurrent, caCurrentPage, caTodosPerPage,
			caIndexOfFirstTodo, caIndexOfLastTodo, caCurrentTodos, caFirstIndexCurrentPage } = this.state;
		let { status, message } = this.state.validationResult;
		caIndexOfLastTodo = caCurrentPage * caTodosPerPage;
		caIndexOfFirstTodo = caIndexOfLastTodo - caTodosPerPage;
		caCurrentTodos = corpOwnerListValue.slice(caIndexOfFirstTodo, caIndexOfLastTodo);

		const TableFamily = (line) => {
			console.log('TableFamily',line);
			return (
				<p><u>{line.line}</u></p>
			)
		}
		const TableHeader = (line) => {
			console.log('TableHeaderLine',line);
			return (
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center'}}>
					<b style={{color:'white'}}>{line.line.header}</b>
				</Grid.Column>			
			)
		}

		const TableRow = (line) => {
			console.log('line', line,'name',line.name);
			let {sno,name,description,family,chromosome,uniprot,mouseOrtholog,antibodies} = line.line;
			return (
				<Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)', padding: 5 }}>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					{sno}
				</Grid.Column>	
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					<b>{name[0]}</b><br/>{name[1]}
				</Grid.Column>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					{description}
				</Grid.Column>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					{family.map((line) => {
							return (
								<TableFamily line={line} />
							)
						})}
				</Grid.Column>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					{chromosome}
				</Grid.Column>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					{uniprot}
				</Grid.Column>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>
					{mouseOrtholog}
				</Grid.Column>
				<Grid.Column width={2} style={{ paddingRight: 30,textAlign:'center' }}>		
					<b><u>{antibodies[0]}</u></b><br/>{antibodies[1]}
				</Grid.Column>
				</Grid.Row>		
			)
		}
		console.log(this.state.tableRows); 
		return (
			

			<Container fluid>
				<PleaseWait active={this.state.showDimmer} />
				<Segment.Group>
				<Segment size='massive' inverted style={{ paddingBottom: 0 }}>
					<Grid columns={2} style={{ paddingBottom: 30 }}>
						<Grid.Column style={{ marginTop: 50 }}>
							<b style={{ color: 'white' }}>&emsp;&nbsp;antiBody</b><b style={{ color: 'red' }}>pedia</b>
						</Grid.Column>
						<Grid.Column floated='right' style={{ padding: 0 }}>
							&emsp;&emsp;&emsp;&emsp;&emsp;
								<Breadcrumb >
								<Breadcrumb.Section><b style={{color :'rgb(163, 148, 148)'}}>About Us</b></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><b style={{color :'rgb(163, 148, 148)'}}>Contact</b></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><b style={{color :'rgb(163, 148, 148)'}}>FAQ</b></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><b style={{color :'rgb(163, 148, 148)'}}>For Providers</b></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><b style={{color :'rgb(163, 148, 148)'}}>Sign in</b></Breadcrumb.Section>
							</Breadcrumb>
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment style={{ padding: 0 }}>
				<Menu icon>
					<Menu.Item name='Explore' active={false} onClick={this.handleItemClick}>
						<Icon name='search' /> &emsp; Explore
						</Menu.Item>
					<Menu.Item
						name='Validate'
						active={false}
						onClick={this.handleItemClick}>
						<Icon name='user' />  &emsp; Validate
						</Menu.Item>
					<Menu.Item
						name='learn'
						active={false}
						onClick={this.handleItemClick}>
						<Icon name='book' /> &emsp; Learn
						</Menu.Item>
				</Menu>
				</Segment>
				<Segment style={{ padding: 0 }}>
					<Grid columns={4} >
						<Grid.Row />
						<Grid.Row>
							<Grid.Column style={{ paddingTop: 15, paddingRight: 0 }}>
								&emsp;&emsp;&emsp;<b style={{ color: 'green' }}>Search For</b>
							</Grid.Column>
							<Grid.Column width={4} style={{ padding: 0, marginLeft: -25 }}>
								<Input icon='search' placeholder='Search' fluid />
								<p style={{ fontSize: '11px', color: 'blue' }} >e.g.Her2,Transcription factors,Chromosome X</p>
							</Grid.Column>
							<Grid.Column width={4} style={{ padding: 0, paddingLeft: 25, marginTop: -20 }}>
								<label style={{ color: 'green' }}> Application</label>
								<Dropdown placeholder='Any' search selection fluid />
							</Grid.Column>
							<Grid.Column style={{ paddingLeft: 60, marginTop: 3 }}>
								<Button positive onClick={this.handleClick}>Search</Button>
								<p style={{ fontSize: '12px', color: 'blue' }} >Advance Search<Icon name='caret down' onClick={this.handleItemClick} /></p>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column style={{ paddingTop: 15, paddingRight: 0 }}>
							</Grid.Column>
							<Grid.Column width={2} style={{ padding: 0, paddingRight: 20, marginLeft: -25 }}>
								<Dropdown search selection fluid options={this.state.stateOptions} />
							</Grid.Column>
							<Grid.Column width={3} style={{ padding: 0, marginTop: -20 }}>
								<label style={{ color: 'black' }}>Field</label>
								<Dropdown search selection fluid options={this.state.stateOptions} />
							</Grid.Column>
							<Grid.Column width={3} style={{ padding: 0, paddingLeft: 25, marginTop: -20 }}>
								<label style={{ color: 'black' }}>Team</label>
								<Input icon='search' placeholder='Search' fluid />
							</Grid.Column>
							<Grid.Column style={{ paddingLeft: 45, marginTop: 3 }}>
								<Button positive onClick={this.handleClick}>Add & Search</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row />
					</Grid>
				</Segment>
				{ !this.state.displayTable &&
				<React.Fragment>
				<Segment style={{ padding: 0 }}>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column style={{ paddingLeft: 45, paddingTop: 15 }}>
								<label style={{ color: 'green', fontSize: 15 }}><b><u>A portal for validated antibodiesTeam</u></b></label>
								<p>Antibodypedia scores antibodies to guide researchers to choose an appropriate antibody for a particular application. The resource contains information about more than three million publicly available research antibodies towards over 19,000 human protein targets from more than 70 providers.<br />
									Use "Search for" to find validated antibodies against your target protein for a particular application! The antibodies are scored using the validation principles outlined by the International Working Group for Antibody Validation and we encourage feedback from researcher by submitting validation data for a particular antibody.</p><br/><br/>
								<Message warning compact size='mini' style={{ minWidth: 300, marginLeft: 1 }}>
									<Message.Header>Content updated 2018-11-08</Message.Header>
									<p>
									3791118 reviewed antibodies from 82 providers,<br/>
									covering gene-products encoded by 19166 genes<br/> 
									(approximately 94% of all human genes).<br/>
									Primary data available for 1858555 experiments.
    								</p>
								</Message>
								<br/>
								</Grid.Column>
							<Grid.Column style={{paddingTop:15,paddingLeft:100}}>
							<label style={{ color: 'green', fontSize: 15 }}><b>Featured Validations</b></label>
							<Image src={require('../../images/image.jpg')} size='medium' bordered/>
							<p style={{fontSize:10}}><b>
							HPA000496<br/>
							Immunofluorescent staining of human cell line A-431 shows localization to nuclear speckles.<br/>
							More info<br/></b></p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				</React.Fragment>}

				{ this.state.displayTable &&
				<React.Fragment>
				<Segment style={{ padding: 0 }}>
				<Grid style={{width :'101%'}}>
				    <Grid.Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid rgba(78, 78, 78, 0.2)',backgroundColor: 'black' }}>
					{this.state.tableHeaders.map((line, key) => {
							return (
								<TableHeader key={key} line={line} />
							)
						})}
				     </Grid.Row>
						{this.state.tableRows.map((line, key) => {
							return (
								<TableRow key={key} line={line} />
							)
						})}
					</Grid>
				</Segment>
				</React.Fragment>}


				<Segment inverted style={{ paddingBottom: 0 }}>
					<Grid style = {{paddingBottom:10}}>
						<Grid.Row>
						<Grid.Column floated='left' style={{ padding: 0 }}>&emsp;&emsp;
								<Breadcrumb >
								<Breadcrumb.Section><p style={{color :'white',fontSize:11}}>About Us |</p></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><p style={{color :'white',fontSize:11}}>Contact |</p></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><p style={{color :'white',fontSize:11}}>FAQ |</p></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><p style={{color :'white',fontSize:11}}>Terms & conditions |</p></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><p style={{color :'white',fontSize:11}}>Site map |</p></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><p style={{color :'white',fontSize:11}}>Listing with us |</p></Breadcrumb.Section>
								<Breadcrumb.Divider icon='right angle' />
								<Breadcrumb.Section ><p style={{color :'white',fontSize:11}}>Report error</p></Breadcrumb.Section>
							</Breadcrumb>
							&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
							<Icon style={{color:'rgb(76, 172, 212)'}} name='thumbs up'/>
							<b style={{color:'rgb(76, 172, 212)'}}>Like</b>&nbsp;&nbsp;
							<Icon style={{color:'rgb(76, 172, 212)'}} name='share square outline'/>
							<b style={{color:'rgb(76, 172, 212)'}}>Share</b>
						</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				
				</Segment.Group>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		corpInfoList: state.order.data.corpInfoList,
		GET_CORP_OWNER_INFO_STATUS: state.order.meta.GET_CORP_OWNER_INFO_STATUS,
		tableHeaders:state.configuration.data.tableHeaders,
		GET_TABLE_HEADERS_STATUS:state.configuration.meta.GET_TABLE_HEADERS_STATUS,
		tableRows:state.configuration.data.tableRows,
		GET_TABLE_ROWS_STATUS:state.configuration.meta.GET_TABLE_ROWS_STATUS
	}
}

const mapDispatchToProps = {
	getCorpAccountOwnerDetails,
	getTableHeaders,
	getTableRows
}

export default connect(mapStateToProps, mapDispatchToProps)(AntibodypediaHome)