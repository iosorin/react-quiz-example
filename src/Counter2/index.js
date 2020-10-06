import React from 'react';
import { ClickedContext } from '../App';

const index = (props) => {
    return (
        <div>
            <h3>Counter 2</h3>

            <ClickedContext.Consumer>
                {(clicked) => (clicked ? <p>Clicked</p> : '')}
            </ClickedContext.Consumer>
        </div>
    );
};

export default index;
