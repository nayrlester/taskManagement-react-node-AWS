const dynamoDb = require('../config/dynamoDb.js');
const TABLE_NAME = 'tasks';

exports.getAllTasks = async () => {
    const params = { TableName: TABLE_NAME };
    const data = await dynamoDb.scan(params).promise();
    return data.Items;
};

exports.getTaskById = async (id) => {
    const params = { TableName: TABLE_NAME, Key: { id } };
    const data = await dynamoDb.get(params).promise();
    return data.Item;
};