export const getMarginBottom = (num) => ({ marginBottom: num })

export const getErrorMessage = (apiError) => {
  if (apiError?.data?.errors) {
    return Object.entries(apiError.data.errors).map(([field, message]) => ({
      name: field,
      errors: [`${field} ${message}`]
    }))
  }
  return []
}
