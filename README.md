https://dashboard.heroku.com/apps/venmo-search

https://venmo-search.herokuapp.com/?q=hello

deploy changes to heroku: 
`npm run deploy`

Run locally:
`npm start`


Looped through 7 million records to calculate the score on each one
This nearly set my 2.6GHZ 6Core i7 32GB MBPro on fire
In hindsight maybe I should have calculated a virtual field w/ mongoose, but this was the easy, dumb way of doing it. 
After about an hour I had at least 500,000 scores calculated, which was a big enough dataset to load into atlas
