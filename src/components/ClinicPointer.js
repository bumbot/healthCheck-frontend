import React, {Component} from 'react';

export default class ClinicPointer extends Component {
    render(){
        return (
            <div onClick={()=> {this.props.renderClinicInfo(this.props.clinicInfo)}}>
                <div style={{
                    color: 'white', 
                    background: 'grey',
                    padding: '15px 10px',
                    display: 'inline-flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '100%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    {this.props.name}
                </div>
            </div>
        )
    }
}