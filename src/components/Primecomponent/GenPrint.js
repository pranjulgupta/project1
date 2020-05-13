import React, { Component } from "react";

// import {PackagePrint} from '../bookPackage'
export default class GenPrint extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount() {
		window.focus()
		setTimeout(()=> window.print(), 200)
	}

	render() {
		return (
			<div>
				{/* <PackagePrint data={this.props.data} print={true}></PackagePrint> */}
			</div>
		)
	}

}
