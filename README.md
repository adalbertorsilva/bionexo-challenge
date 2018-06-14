# bionexo-challenge

This is a sample solution for Bionexo's hiring challenge.

- The challenge consists in an app the Health Basic Units based on geolocation coordinates ( latitude and longitude ), by default a 10km radius search was set

- This API can be tested live at [Heroku](https://bionexo-challenge.herokuapp.com/find_ubs?query=-23.604936,-46.692999&page=1&per_page=10)

## Getting Started

### Prerequisites

- Node.js 8.9.4 or higher
- NPM 5.7.1 or higher
- ( Optional ) [NVM](https://github.com/creationix/nvm)
- [Postgres](https://www.postgresql.org/download/) database 9.6 or higher with [Postgis](https://postgis.net/install/) extension
- Git
- ( Optional ) Docker 18.03.1 or higher
- ( Optional ) docker-compose version 1.21.1 or higher

### Instalation

- Clone this project using the command below inside your terminal

```
git clone https://github.com/adalbertorsilva/bionexo-challenge.git
```

-  Enter the folder

```
cd bionexo-challenge/
```

- Create a .env file on root directory and set an DATABASE_HOST, DATABASE_PASSWORD and DATABASE_USER variables on it

- Inside your terminal, run the command to start application

```
npm install && npm start
```

( OPTIONAL )

- If you have nvm installed on your computer run the commmand

```
nvm install && npm install && npm start
```
instead of the command on the previous section ( it will install and use the node version wich the app was created )

- The app will start on port 3000

### ( OPTIONAL ) Docker instalation

- If you have docker and docker-compose on your computer you may install the application by clonning the repo, change for the project's directory and run the command: 

```
$ docker-compose up
```

- This comand will install the app on porte 3000 and a postgres database on port 5433

### Running Tests

- To run automated tests use the command

```
npm test
```

### Test Coverage

- After each test running, it will show up a succinct coverage summary.

```
=============================== Coverage summary ===============================
Statements   : 99.69% ( 326/327 )
Branches     : 91.84% ( 45/49 )
Functions    : 100% ( 94/94 )
Lines        : 99.69% ( 317/318 )
================================================================================
```
- If you want to see a more detailed report, after each test execution a **coverage folder** is created / updated and inside of it there is an **index.html** file that may show a more detailed apresentation on your browser
