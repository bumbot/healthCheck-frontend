import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

export default class SearchContainer extends Component {
    render() {
        return(
            <div className='search-bar'>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Search by Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        aria-describedby="basic-addon1"
                        placeholder={"Start entering a name!"}
                        onChange={this.props.updateSearch}
                    />
                </InputGroup>
            </div>
        )
    }
}