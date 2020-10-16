import AWS from 'aws-sdk';
import validator from '@middy/validator';
import createError from 'http-errors';

import { commonMiddleware } from '../../lib/commonMiddleware';
import { sendSMSSchema } from '../../lib/schemas/sendSMSSchema';

async function sendSMS(event) {
  const {
    phone,
    message,
  } = event.body;

  const params = {
    Message: message,
    PhoneNumber: phone,
  };

  try {
    const result = await new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(sendSMS)
  .use(validator({ inputSchema: sendSMSSchema }));
