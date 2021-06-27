import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    IndexName: process.env.index,
    KeyConditionExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": event.pathParameters.username,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});
