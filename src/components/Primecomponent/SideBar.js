import React, { Component } from 'react'
import {Sidebar} from 'primereact/sidebar';
import {TabMenu} from 'primereact/tabmenu';

export default class SideBar extends Component {
 
    render() {

        return (
            <div>
                  <div className="content-section implementation">
                    <Sidebar visible={this.state.visibleLeft} baseZIndex={1000000} onHide={(e) => this.setState({visibleLeft: false})}>
                        {/* <h1 style={{fontWeight:'normal'}}>Left Sidebar</h1>
                        <Button type="button" onClick={(e) => this.setState({visibleLeft: false})} label="Save" className="p-button-success" style={{marginRight:'.25em'}} />
                        <Button type="button" onClick={(e) => this.setState({visibleLeft: false})} label="Cancel" className="p-button-secondary"/> */}
                    </Sidebar>
                    </div>

            </div>
        )
    }
}
