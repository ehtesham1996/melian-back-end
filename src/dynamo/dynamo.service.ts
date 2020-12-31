/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoService {
  private docClient;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  async putItem(tableName, item: any): Promise<boolean> {
    try {
      const dynamoParams = {
        TableName: tableName,
        Item: item
      };

      await this.docClient.put(dynamoParams).promise();
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getItem(tableName, Key): Promise<any> {
    const params = {
      TableName: tableName,
      Key
    };
    const data = await this.docClient.get(params).promise();
    return data.Item ? data.Item : false;
  }

  async deleteItem(tableName, Key): Promise<any> {
    const params = {
      TableName: tableName,
      Key
    }
    await this.docClient.delete(params).promise();
  }

  async updateExpression(tableName, Key, Item): Promise<any> {
    try {
      const keys = {};
      const values = {};
      let updateString = 'set ';

      // eslint-disable-next-line guard-for-in
      for (const attribute in Item) {
        if (attribute === 'CreatedAt') {
          updateString += `#${attribute} = if_not_exists(#${attribute}, :${attribute}), `;
        } else {
          updateString += `#${attribute} = :${attribute}, `;
        }
        keys[`#${attribute}`] = attribute;
        values[`:${attribute}`] = Item[attribute];

        if (attribute === 'Email') {
          values[`:${attribute}`] = Item[attribute].toLowerCase();
        }
      }

      updateString = updateString.substr(0, updateString.length - 2);

      const params = {
        TableName: tableName,
        Key,
        UpdateExpression: updateString,
        ExpressionAttributeNames: keys,
        ExpressionAttributeValues: values,
        ReturnValues: "UPDATED_NEW"
      };

      await this.docClient.update(params).promise();
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}