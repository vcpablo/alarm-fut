import React from 'react'
import { Formik } from 'formik'
import { validateLoginForm as validate } from '@/utils/validation'
import LoginForm from './LoginForm/LoginForm'

const LoginFormik = ({ onSubmit, loading, error }) => {
  const initialValues = { email: '', password: '' }

  const formik = { initialValues, validate, onSubmit }

  return (
    <Formik {...formik}>
      {(props) => <LoginForm {...{ ...props, loading, error }} />}
    </Formik>
  )
}

export default LoginFormik
