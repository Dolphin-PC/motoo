export const EErrorMessage = {
  REQUIRED: "This is a required field.",
  MINIMUM: (num: number) => `Please enter at least ${num} characters.`,
  EMAIL: "Invalid email address",
};

export const FormPattern = {
  EMAIL: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: EErrorMessage.EMAIL,
  },
};
