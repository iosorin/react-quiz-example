import React, { Component } from 'react';

class index extends Component {
    render() {
        console.log('this.props', this.props);
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>{this.props.match.params.name}</h1>
            </div>
        );
    }
}

export default index;
