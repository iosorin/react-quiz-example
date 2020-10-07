import React from 'react';
import { ClickedContext } from '../App';

const index = (props) => {
    return (
        <div>
            <ClickedContext.Consumer>
                {(clicked) => <h3>{clicked ? 'Clicked' : 'NOT Clicked'}</h3>}
            </ClickedContext.Consumer>
        </div>
    );
};

export default index;
