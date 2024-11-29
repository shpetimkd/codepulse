import { APIGatewayProxyResult } from 'aws-lambda';

export const status = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  }
};
