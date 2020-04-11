const status = require('http-status');

const withStatusCode = statusCode => {
  if (typeof status[statusCode] === 'undefined') {
    throw new Error(`Invalid status code: ${statusCode}`);
  }

  // return a function that will take some data and formats a response with a status code
  return (data = null) => {
    const response = {
      statusCode,
      headers: { location: data }
    };

    return response;
  };
};

module.exports = {
  withStatusCode
};
