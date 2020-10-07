import React from 'react';

const About = (props) => {
    const goToHome = () => {
        // props.history.push('/');

        props.history.push({
            pathname: '/'
        });
    };

    return (
        <div>
            <h1>About page component</h1>
            <button onClick={goToHome}>goToHome</button>
        </div>
    );
};

export default About;
