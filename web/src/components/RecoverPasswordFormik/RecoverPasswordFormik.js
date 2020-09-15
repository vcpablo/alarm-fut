import React from 'react'
import { Formik } from 'formik'
import { validateRecoverPasswordForm as validate } from '@/utils/validation'
import RecoverPasswordForm from './RecoverPasswordForm/RecoverPasswordForm'

const RecoverPasswordFormik = ({ onSubmit }) => {
  const initialValues = { email: '' }

  const formik = { initialValues, validate, onSubmit }

  return (
    <Formik {...formik}>{(props) => <RecoverPasswordForm {...props} />}</Formik>
  )
}

export default RecoverPasswordFormik
