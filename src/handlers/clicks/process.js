require('dotenv/config');
const status = require('http-status');

const { initialize } = require('../../utils/db');

const { withStatusCode } = require('../utils/response-util');
const { get } = require('../../models/promotion');
const { register } = require('../../models/click');

const handler = async (event, context) => {
  /* eslint-disable-next-line */
  context.callbackWaitsForEmptyEventLoop = false;
  await initialize;

  const {
    headers,
    pathParameters: { path: slug },
    requestContext: {
      identity: { userAgent }
    }
  } = event;

  const sourceIp = (headers['CF-Connecting-IP'] || '').split(', ')[0];
  const countryCode = (headers['CF-IPCountry'] || '').split(', ')[0];

  const { id, url } = await get(slug);
  await register(id, sourceIp, userAgent, countryCode);
  return withStatusCode(status.FOUND)(url);
};

module.exports = {
  handler
};
