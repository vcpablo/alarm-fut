import { LOGIN_FORM, REGISTER_FORM } from '@/constants/validation'

const isValidEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

const validateEmail = (values) => {
  const errors = {}
  if (!isValidEmail(values.email)) {
    errors.email = LOGIN_FORM.EMAIL
  }

  return errors
}

export const validateLoginForm = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = LOGIN_FORM.PASSWORD
  }

  return {
    ...errors,
    ...validateEmail(values)
  }
}

export const validateRegisterForm = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = REGISTER_FORM.NAME
  }

  return {
    ...errors,
    ...validateLoginForm(values)
  }
}

export const validateRecoverPasswordForm = (values) => validateEmail(values)
