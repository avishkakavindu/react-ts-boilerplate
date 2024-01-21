import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Form Container will wrap the forms
 * @param props
 * @returns
 */
function FormContainer(props: any) {
  const { children } = props;
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
