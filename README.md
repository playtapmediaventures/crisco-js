# Influencer

An API for evaluating the reach of YouTube influencers for the purposes of pricing campaigns and partnerships. It allows you to customize your base CPM, the age range of videos to consider, and how many standard deviations away from the mean to include.

### Installing

Install all the dependencies

```
npm install
```

Copy the `.env.example` to `.env`

```
cp .env.example .env
```

Update `.env` with your Google API Key and your AWS Access Key Id and Secret Key Id. These are needed to call the YouTube APIs and to interact with AWS λ, respectively.

```
GOOGLE_API_KEY='<google api key>'
AWS_ACCESS_KEY_ID='<aws access key id>'
AWS_SECRET_ACCESS_KEY='<aws secret access key>'
```

To start it, simply run

```
npm run start
```

By default, it runs at `localhost:8000`. You can use cURL, Postman, or you favorite REST Client to call the endpoint.

The following call returns the video list used for evaluation, aggregate stats, and the estimated cost of a partnership for the influencer MyLifeAsEva based on her videos from the last 30 days:

```
curl "http://localhost:8080/prices?username=MyLifeAsEva&minAge=1&maxAge=30"
```

## Running the tests

To run unit tests, run

```
npm test
```

### Running end-to-end tests

To run end-to-end tests with Cucumber, run

```
npm run cucumber
```

### We use prettier and AirBnB's style guide

To lint your code and fix it, you can run

```
npm run lint:fix
```

## Deployment

To deploy to your own AWS λ endpoint, simply run

```
npm run sls deploy
```
