import React, {Component} from 'react';

export default class LoginContainer extends Component {
    render() {
        return (
            <div className="login">

                <form name="">
                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}