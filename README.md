# webhook-api.ai-bot1
It's a fulfilment file for api.ai written in Node.js to be used for webhook for the agent (Bot) given in the zip file.
The zip file contains the Bot agent which can be imported to Google DialogFlow.
Rest of the files are under this node project which is deployed on Heroku.

The index.js contains the logic for the fulfillment of the agent based on actions.
The same can be utilised by setting the agent's webhook url to : "https://webhook-bot1.herokuapp.com/fulfill"
Or You can deploy your own webhook using the below link.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)