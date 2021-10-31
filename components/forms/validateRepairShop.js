/* eslint-disable prefer-const */
export default function validateReg(values) {
  let errors = {}

  !values?.name && (errors.name = 'Name is required')

  !values?.bankAccount &&
    (errors.bankAccount = 'Bank account number is required')

  !values?.address && (errors.address = 'Bank account number is required')

  !values?.latitude && (errors.coords = 'Bank account number is required')

  return errors
}
