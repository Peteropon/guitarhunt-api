import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      guitarId: event.pathParameters.id,
      username: event.pathParameters.username,
    },
    UpdateExpression: "SET votes = :votes",
    ExpressionAttributeValues: {
      ":votes": data.votes + 1,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
