# Music Library API Project - Overview

For this project we created a Music Library API, following a CRUD REST API methodology. The Music Library stores information about artists, albums, and songs. It was one of the major backend projects we completed and included using technologies such as Node.js, Express, Sequelize, Mocha-Chai (for testing our asynchronous code), and well as Postman and MySQL Workbench to interact with out work and view and maniupulate the databases we created. CRUD (create, read, update, delete) operations can be performed on all of the sections (artists, albums, and songs). We also learned about the HTTP method equivalents (POST, GET, PATCH, DELETE) for the CRUD operations we were performing.

## Technologies

* Mocha / Chai
* Node.js
* Express
* JavaScript
* Postman
* MySQL Workbench
* Sequelize

## Concepts

* Databases
* Database Design
* SQL
* MySQL
* Sequelize
* Database Querying and CRUD operations

## Learning objectives

* Explain what a data schema is
    * Represents any structure that we're defining around the data, such as tables and relationships. We defined data schemas for each item (artists, albums, and songs) in their own files and then made the connections between these three items in the *index.js* file in the *models* section.
* Design and implement an API with CRUD operations on a database
    * This project was focused on creating an API utilizing CRUD (create, read, update, delete) operations. This was accomplished using the HTTP protocol equivalents (POST, GET, PATCH, DELETE). These directions that we created ensured that when the HTTP requests were made the appropriate response would be returned from the API. We used Postman and MySQL Workbench to test and then see that we were getting the appropriate responses.
    * API stands for Application Programming Interface and is essentially a messenger that takes a request from the client, tells a system what the client wants to do, and then sends back the appropriate response. It allows one piece of software to talk to another piece of software.
    * REST stands for REpresentational State Transfer and is the way in which we interact with the API (via a specific route and a specific type of request). For example, to view all the artists in the database we would send a *GET* request via the route `/artists`.

# Getting Started

Fork and clone the repo and then run `npm test` in the file to ensure all tests pass.

Then run `npm start` which will fire up the Express app at `http://localhost:4000`.

Open up Postman and MySQL Workbench in order to check work / requests.

***

## Artists Section

### Artists POST

Ensure that your request is set to `POST` and that you add `/artists` to your Postman route (e.g., `http://localhost:4000/artists`).

In the `Body` section, click `raw` and ensure the `text` is set to `JSON`.

Type in the field: 

> {
>
>    "name": "Tame Impala",
>
>    "genre": "Rock"
>
> }

(Or type whatever artists / genres you like!)

Click the `Send` button and in the section below you will see your results!

### Artists GET

Ensure that your request is set to `GET` and that you add `/artists` to your Postman route (e.g., `http://localhost:4000/artists`).

In the `Body` section click `none` and then click the `Send` button. You will see all the results for the artists you have added!

If you want to look at one specific artist and not the entire list add the id of the artist you want to see to your route (e.g., `http://localhost:4000/artists/1`). To make sure the error message is working but in an id for an artist that you know doesn't exist (e.g., `http://localhost:4000/artists/12345`). You should get the error message: 

> 'The artist could not be found.'

### Artists PATCH

Ensure that your request is set to `PATCH` and that you add `/artists/:id` to your Postman route (e.g., `http://localhost:4000/artists/1`).

In the `Body` section make sure the text is set to `raw` and `JSON`. Try changing either the `name` or `genre` values. For example:

> {
>
>    "name": "The Flaming Lips"
>
>}

OR

> {
>
>    "genre": "Pop"
>
> }

In your response body you should see the number 1 - this means that the file has been updated (there has been one change). To see your changes, make another GET request!

Make sure the error for this works by adding an artist route you know doesn't exist (e.g., `http://localhost:4000/artists/12345`) and you should see the message: 

> 'The artist could not be found.'

### Artists DELETE

Ensure that your request is set to `DELETE` and that you add `/artists/:id` to your Postman route (e.g., `http://localhost:4000/artists/1`).

In the `Body` section click `none` and then click the `Send` button. You will see all the results for the artists you have added!

Do a GET request to make sure that the artist no longer exists: 'The artist could not be found.'

Make sure the error for this works by adding an artist route you know doesn't exist (e.g., `http://localhost:4000/artists/12345`) and you should see the message: 

> 'The artist could not be found.'

***

## Albums Section

### Albums POST

Ensure that your request is set to `POST` and that you add `/artists/:artistId/albums` to your Postman route (e.g., `http://localhost:4000/artists/1/albums`).

In the `Body` section, click `raw` and ensure the `text` is set to `JSON`.

Type in the field: 

> {
>
>    "name": "InnerSpeak",
>
>    "year": "2010"
>
> }

(Or type whatever albums / years you like!)

Click the `Send` button and in the section below you will see your results!

### Albums GET

Ensure that your request is set to `GET` and that you add `/albums` to your Postman route (e.g., `http://localhost:4000/albums`).

In the `Body` section click `none` and then click the `Send` button. You will see all the results for the albums you have added!

If you want to look at one specific album and not the entire list add the id of the album you want to see to your route (e.g., `http://localhost:4000/albums/1`). To make sure the error message is working put in an id for an album that you know doesn't exist (e.g., `http://localhost:4000/albums/12345`). You should get the error message: 

> 'The album could not be found.'

### Albums PATCH

Ensure that your request is set to `PATCH` and that you add `/albums/:id` to your Postman route (e.g., `http://localhost:4000/albums/1`).

In the `Body` section make sure the text is set to `raw` and `JSON`. Try changing either the `name` or `year` values. For example:

> {
>
>    "name": "Empty Streets"
>
> }

OR

> {
>
>    "year": 1983
>
> }

In your response body you should see the number 1 - this means that the file has been updated (there has been one change). To see your changes, make another GET request!

Make sure the error for this works by adding an album route you know doesn't exist (e.g., `http://localhost:4000/albums/12345`) and you should see the message: 

> 'The album could not be found.'

### Albums DELETE

Ensure that your request is set to `DELETE` and that you add `/albums/:id` to your Postman route (e.g., `http://localhost:4000/albums/1`).

In the `Body` section click `none` and then click the `Send` button. In your response body you should see the number 1 - this means that the file has been updated (there has been one change). To make sure the album no longer exists, make another GET request! You should see:
"The album could not be found."

Make sure the error for this works by adding an album route you know doesn't exist (e.g., `http://localhost:4000/albums/12345`) and you should see the message: 

> 'The album could not be found.'

***

## Songs Section

### Songs POST

Ensure that your request is set to `POST` and that you add `/albums/:albumId/songs` to your Postman route (e.g., `http://localhost:4000/albums/1/songs`).

In the `Body` section, click `raw` and ensure the `text` is set to `JSON`.

Type in the field: 

> {
>
>    "name": "Solitude is Blss"
>
> }

(Or type whatever song names you like!)

Click the `Send` button and in the section below you will see your results!

### Songs GET

Ensure that your request is set to `GET` and that you add `/songs` to your Postman route (e.g., `http://localhost:4000/songs`).

In the `Body` section click `none` and then click the `Send` button. You will see all the results for the songs you have added!

If you want to look at one specific song and not the entire list add the id of the song you want to see to your route (e.g., `http://localhost:4000/songs/1`). To make sure the error message is working put in an id for an song that you know doesn't exist (e.g., `http://localhost:4000/songs/12345`). You should get the error message: 

> 'The song could not be found.'

### Songs PATCH

Ensure that your request is set to `PATCH` and that you add `/songs/:id` to your Postman route (e.g., `http://localhost:4000/songs/1`).

In the `Body` section make sure the text is set to `raw` and `JSON`. Try changing either the `name` or `year` values. For example:

> {
>
>    "artist": 3
>
> }

OR

> {
>
>    "album": 2
>
> }

OR

> {
>
>    "name": "Forsooth I be a Song!"
>
> }

In your response body you should see the number 1 - this means that the file has been updated (there has been one change). To see your changes, make another GET request!

Make sure the error for this works by adding a song route you know doesn't exist (e.g., `http://localhost:4000/songs/12345`) and you should see the message: 'The song could not be found.'

### Songs DELETE

Ensure that your request is set to `DELETE` and that you add `/songs/:id` to your Postman route (e.g., `http://localhost:4000/songs/1`).

In the `Body` section click `none` and then click the `Send` button. In your response body you should see the number 1 - this means that the file has been updated (there has been one change). To make sure the album no longer exists, make another GET request! You should see:
"The song could not be found."

Make sure the error for this works by adding a song route you know doesn't exist (e.g., `http://localhost:4000/songs/12345`) and you should see the message: 'The song could not be found.'

*** 
 
## Acknowledgments

Thanks to the [Manchester Codes](https://manchestercodes.com/software-engineer-fasttrack) team for all the support and knowledge so far: Romy, Andreea, Ian, Tom, Whitney, Ersel, Holly and more.  

Thanks for stopping by!