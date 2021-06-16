import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './style.css';

const Ingredients = ({ ingres }) => {
    
    return (

        <div className="ingre">
            <Card className="ingreCard">
                <Card.Title className="ingreTitle">
                    Ingredients
                </Card.Title>
                <Card.Body>
                    <ul>
                        {ingres.map((ingres, index) => {
                            return (
                                <li key={index}>
                                    <div className='itemIngre'>
                                        {`${ingres}`}
                                        {/* <Button variant="link">✎</Button> */}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Ingredients
