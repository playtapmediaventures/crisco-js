const { handler } = require('./src/handlers/clicks/process.js');

async function main() {
  const [, , format, targetCpm, minAge, maxAge, stdDevs, ...usernames] = process.argv;
  if (usernames.length === 0) {
    // eslint-disable-next-line no-console
    console.log('Username is required!');
    process.exitCode = 1;
    return;
  }

  const event = {
    headers: {},
    queryStringParameters: {
      format,
      minAge,
      maxAge,
      stdDevs,
      targetCpm,
      username: usernames.join(',')
    }
  };

  const { body } = await handler(event);
  const parser = format === 'json' ? JSON.parse : _ => _;

  // eslint-disable-next-line no-console
  console.log(parser(body));
}

main();
