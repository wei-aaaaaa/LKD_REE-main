import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const WaitingRoom = ({ joinChatRoom, currentUser }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        joinChatRoom();
    };

    return (
        <div className="px-5 py-5">
            <Row>
                <Col sm={12}>
                    <h2>Welcome, {currentUser}</h2>
                </Col>
                <Col sm={12}>
                    <hr />
                    <Button variant="success" onClick={handleSubmit}>Join Chat Room</Button>
                </Col>
            </Row>
        </div>
    );
};

export default WaitingRoom;
