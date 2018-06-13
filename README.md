# bionexo-challenge

This is a sample solution for Bionexo's hiring challenge.

## Getting Started

### Prerequisites

- Node.js 8.9.4 or higher
- NPM 5.7.1 or higher
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

The app will start on port 3000

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
