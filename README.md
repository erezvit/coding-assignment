# Vi Coding Assignment 

This project helps us Marvel enthusiasts quering interesting data regarding our beloved heros and actio movies.
This project is built as an express js based web server which is using The Movies Database service in order to answer the users' queries.

## Tools
- Jest for testing
- axios for making API calls
- express for exposing a web server

## Getting Started

### Install dependencies

Before starting to code, don't forget to install all dependencies.

```shell
yarn
```

### Running tests

Run all tests once:

```shell
yarn test
```

### How to use

#### Starting the server
The server depends on 2 environment variables (port and tmdbApiKey), so defining those variables are required while starting the server.

To start the server

```shell
port=<port_number> tmdbApiKey=<valid_tmdb_api_key_value> yarn start
```

#### Making API calls:
After starting the server you can make 4 get HTTP calls to the server:

Health Chek: http://server_domain_and_port/

List of movies per actor: http://server_domain_and_port/moviesPerActor

Actors played multiple characters: http://server_domain_and_port/actorsWithMultipleCharacters

Characters played by multiple actors: http://server_domain_and_port/charactersWithMultipleActors

