import React from 'react'
import { Formik } from 'formik'
import { validateRegisterForm as validate } from '@/utils/validation'
import RegisterForm from './RegisterForm/RegisterForm'

const RegisterFormik = ({ onSubmit }) => {
  const initialValues = { name: '', email: '', password: '' }

  const formik = { initialValues, validate, onSubmit }

  return <Formik {...formik}>{(props) => <RegisterForm {...props} />}</Formik>
}

export default RegisterFormik
