This repo contains a basic setup for a Postgres powered API server. 

# Usage

## Setup the script

1. Clone this template repo to local machine
2. `cd` into the cloned repo
3. Set up a database using config detailed in queries.js
4. Run `node index.js` 
5. Visit http://localhost:3010/products/
6. Visit http://localhost:3010/products/1 etc to see individual products

# API routes for testing

## POST 
Create product and adds it to the inventory

`curl --data "name=HealthyVitabolic&current_count=18&manual_count=18" http://localhost:3010/products`

## PUT 
Removes a single item from the stock

`curl -X PUT -d "name=HealthyVitabolic" http://localhost:3010/products/5`

## DELETE
Deletes product from the inventory

`curl -X "DELETE" http://localhost:3010/products/4`
