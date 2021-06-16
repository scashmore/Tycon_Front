import React, {useState} from 'react';
import { Button, Modal} from 'react-bootstrap';
import RestuarantForm from './RestuarantForm/RestaurantForm';

import './style.css'


export const AddRestaurants = ({generateRestaurant}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="add">
            <Button className="addBtn" variant="outline-info" size="lg" onClick={handleShow}>Add Restaurant</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Restaurant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <RestuarantForm handleClose={handleClose} generateRestaurant={generateRestaurant}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddRestaurants