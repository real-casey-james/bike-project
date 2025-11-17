# City Bikes Explorer Readme

## Quickstart

1. Copy `app/.env.example` to `app/.env` and enter your [Google Maps Platform API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. [Install Docker](https://www.docker.com/get-started/) if needed, and run `docker compose up` in the root folder this readme is in
3. Once Docker has started the containers, visit http://localhost:3000/

## In Development

This project is in development and is not production ready

## Containers in this project

### db

MySQL Database running on port 3306

Docker automatically creates the database and user, then runs `server/db/scripts/setup.sh`, which:
- Creates the `stations` table if needed
- Seeds the `stations` table with test data

Run the script on demand if needed with:
`docker exec -it bike-project-db sh docker-entrypoint-initdb.d/setup.sh`

### server

Node.js server running on port 3001

Nodemon is running, so will restart on changes to `/server/src`

Endpoints:

`GET /stations`\
Get all stations\
Returns `Station`'s on success\
Or `500` on failure

`POST /stations`\
Create a station\
Send a `Station` as JSON\
Returns `200` on success\
Or `400` on incorrect payload\
Or `500` any other failure

`GET /stations/:station_id`\
Get a station by id\
Returns a `Station` on success\
Or `404` if station not found\
Or `400` on incorrect payload\
Or `500` any other failure

`PUT /stations/:station_id`
Update a station
Send a `Station` as JSON\
Returns `200` on success\
Or `400` on incorrect payload\
Or `500` any other failure

`DELETE /stations/:station_id`\
Delete a location\
Returns `200` on success\
Or `400` on incorrect payload\
Or `500` any other failure

#### `Station` definition
```
{
    station_id?: number;
    name: string;
    latitude: string;
    longitude: string;
    bikes_available: number;
}
```
### web

React front end running on port 3000

Server is hot-reload enabled, so will update instantly to any changes in `/app`

## Packages used

### ant-design

Provides clean and easy to use components. Default styling is acceptable. I'm familiar with the package, which allows for speedy development

### react-toastify

Simple notifications to greet the user and let them know if something goes wrong. Easy to invoke

### react-google-maps

Provides a React wrapper around the Google Maps API

After researching options, this looked like the cleanest and easiest to use, with a downside of needing an API key


## Todo

- Mobile friendly
- Additional tests
- City/region support
- Large data set support
- Pagination
- XSS prevention
- Long/lat validation
- Authentication/user management
