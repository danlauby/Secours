import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import LoginForm from '../../containers/login/LoginForm';


const LoginPage = () => {
    return (
      <Container>
        <Row>
          <Col xs={{ size: 4, offset: 4 }}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    )
}

export default LoginPage;
