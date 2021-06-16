import React from 'react';
import './style.css';
import {Jumbotron} from 'react-bootstrap'

export const Header = () => {
    return (
        <div>
            <Jumbotron className="jumbo">
                <h1 className="welcome">Welcome Restaurant Tycon!</h1>
                <h4 className="welcome">To start your empire, simply click on the add restaurant button and fill out the form!</h4>
                <h4 className="welcome">A restaurant based on your specificaitons will then be generated!</h4>
            </Jumbotron>
        </div>
    )
}

export default Header