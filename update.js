import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      guitarId: event.pathParameters.id, // The id of the guitar from the path
      username: event.pathParameters.username, // The username of the author
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      "SET title = :title, description = :description, urlLink = :urlLink, attachment = :attachment",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":description": data.description || null,
      ":urlLink": data.urlLink || null,
      ":attachment": data.attachment || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
