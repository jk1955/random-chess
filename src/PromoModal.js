import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function PromoModal(props) {
  console.log(props);
  if (!props.isOpen) {
    return null;
  }

  var isOpen = props.isOpen;
  var setIsOpen = props.setIsOpen;
  var promotion = props.promotion;
  var setPromotion = props.setPromotion;

  const hideModal = () => {
    setIsOpen(false);
  };

  function handleChange(e) {
    e.preventDefault();

    setPromotion(e.target.value);
  }

  function save(e) {
    e.preventDefault();

    hideModal();

    setPromotion(e.target.value);

    console.log(promotion, e.target.value);
  }

  return (
    <>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Please enter either q,r,n or b</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="q,r,n,b"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
