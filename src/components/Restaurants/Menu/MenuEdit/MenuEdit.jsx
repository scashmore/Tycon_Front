import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import MenuForm from './MenuForm/MenuForm';

const MenuEdit = ({menuItem, menuDescrip, updateMenuItem}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button className="editBtn" variant="link" size="lg" onClick={handleShow}>✎</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <MenuForm updateMenuItem={updateMenuItem} menuItem={menuItem} menuDescrip={menuDescrip}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MenuEdit
