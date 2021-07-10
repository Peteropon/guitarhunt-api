import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      guitarId: uuid.v1(), // A unique uuid
      username: event.requestContext.identity.username,
      title: data.title,
      description: data.description, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      urlLink: data.urlLink, // Parsed from request body
      votes: 0,
      comments: [],
      isActive: true,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
