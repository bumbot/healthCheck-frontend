import React, {Component} from 'react';

export default class SearchContainer extends Component {
    render() {
        return(
            <div>
                <form>
                    <input
                        placeholder={"Enter a Search Term"}
                        onChange={this.props.updateSearch}
                    />
                </form>
            </div>
        )
    }
}