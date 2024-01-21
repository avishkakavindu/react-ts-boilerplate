import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { TRootState } from 'store';
import { IAuthState, ICustomErrorResponse, ILoginInput, TContextObject } from 'types';
import { useLoginMutation } from 'slices/userAPI.slice';
import { setCredentials } from 'slices/auth.slice';
import FormContainer from 'components/form/FormContainer';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginInput>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: TRootState) => state.auth);

  const [responseErrors, setResponseErrors] = useState<string[]>();

  useEffect(() => {
    // if user info available navigate to home page
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  /**
   * FOrm submit handler
   * @param {ILoginInput} data - Login form data
   */
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      const errorResponse = err as ICustomErrorResponse;
      if (errorResponse?.data) {
        const { error } = errorResponse.data;

        if (error?.userMessage !== '') {
          setResponseErrors([error.userMessage]);
        } else {
          const { context } = error;
          const errMessages =
            context?.map((errorItem: TContextObject) => {
              const { message } = errorItem;
              return message;
            }) || [];
          setResponseErrors(errMessages);
        }
      }
      toast.error('Authentication failed');
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="my-2" controlId="email">
          <Form.Label> Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label> Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: 'Password is required' })}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {responseErrors && (
          <Alert variant="danger">
            <ul>
              {responseErrors.map((message) => (
                <li key={message}>
                  <small>{message}</small>
                </li>
              ))}
            </ul>
          </Alert>
        )}

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Login;
