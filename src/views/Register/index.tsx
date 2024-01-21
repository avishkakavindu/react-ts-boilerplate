import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IRegisterInput } from 'types';
import FormContainer from 'components/form/FormContainer';

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterInput>();

  const onSubmit: SubmitHandler<IRegisterInput> = (data) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="my-2" controlId="name">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            {...register('firstName', {
              required: 'First Name is required',
            })}
            isInvalid={!!errors.firstName}
          />
          {errors.firstName && (
            <Form.Control.Feedback type="invalid">
              {errors.firstName.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="name">
          <Form.Label> Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            {...register('lastName', {
              required: 'Last Name is required',
            })}
            isInvalid={!!errors.lastName}
          />
          {errors.lastName && (
            <Form.Control.Feedback type="invalid">
              {errors.lastName.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>

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
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                message:
                  'Password must contain at least one letter, one digit, and one special character',
              },
            })}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
            isInvalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Register;
