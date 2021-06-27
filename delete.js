import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      guitarId: event.pathParameters.id, // The id of the guitar from the path
      username: "fdasadfda", // The id of the author
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
