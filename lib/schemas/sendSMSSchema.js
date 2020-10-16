export const sendSMSSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          pattern: '^\\+?\\d{12}$',
        },
        message: { type: 'string' },
      },
      required: ['phone', 'message'],
    },
  },
  required: ['body'],
};
