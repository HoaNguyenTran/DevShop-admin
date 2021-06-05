import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Input } from "../../components/UI/Input";
import { login } from "../../actions"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router";

export default function Signin(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [error, setError] = useState("");
  const auth = useSelector(state => state.auth)

  const userLogin = (e) => {
    e.preventDefault();

    dispatch(login({email, password}));
  }

  if(auth.authenticate) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ margin: "3rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="text"
                id="email"
                onChange={e => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                id="password"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
