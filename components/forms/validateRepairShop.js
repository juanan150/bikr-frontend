/* eslint-disable prefer-const */
export default function validateReg(values) {
  let errors = {}

  !values?.name && (errors.name = 'Name is required')

  !values?.accountNumber &&
    (errors.accountNumber = 'Bank account number is required')

  !values?.address && (errors.address = 'Address is required')

  !values?.latitude && (errors.coords = 'Select the location on the map')

  values?.services.length === 0 &&
    (errors.services = 'At leat 1 service is required')

  return errors
}
