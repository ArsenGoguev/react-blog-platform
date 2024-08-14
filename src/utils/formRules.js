const recurringRules = {
  username: [
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Username must contain only Latin letters and numbers'
    },
    {
      min: 3,
      max: 20,
      message: 'Username must be between 3 and 20 characters long'
    }
  ],
  email: [
    {
      type: 'email',
      message: 'Enter the correct mailing address'
    }
  ],
  password: [
    {
      min: 6,
      max: 40,
      message: 'The password must be between 6 and 40 characters long'
    }
  ]
}

export const userFormRules = {
  email: [
    ...recurringRules.email,
    {
      required: true,
      message: 'The email should not be empty'
    }
  ],
  username: [
    {
      required: true,
      message: 'Username should not be empty'
    },
    ...recurringRules.username
  ],
  password: [
    {
      required: true,
      message: 'The password must not be empty'
    },
    ...recurringRules.password
  ],
  repeatPassword: [
    {
      required: true,
      message: 'Repeat the password'
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('Passwords dont match'))
      }
    })
  ],
  agreement: [
    {
      required: true,
      message: 'You must agree to the processing of personal data'
    }
  ]
}

export const postFormRules = {
  title: [
    {
      required: true,
      min: 3,
      max: 50,
      message: 'The name must contain at least 3 and no more than 50 characters'
    }
  ],
  description: [
    {
      required: true,
      min: 3,
      max: 300,
      message: 'The short description must be at least 3 and no more than 300 characters'
    }
  ],
  text: [
    {
      required: true,
      min: 3,
      max: 18000,
      message: 'The text of the post should contain from 3 to 18 000 characters'
    }
  ],
  tag: [
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Only Latin letters and numbers without spaces'
    },
    {
      max: 25,
      message: 'Maximum of 25 characters'
    }
  ]
}

export const editProfileForm = {
  username: recurringRules.username,
  email: recurringRules.email,
  password: recurringRules.password,
  avatarImage: [
    {
      type: 'url',
      message: 'Enter the correct URL'
    }
  ]
}
