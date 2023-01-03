## How To Run
In order to run the application on local please go to the directiry `./server` and run the following command.

Create the database:

`
flask init-db
`

Run the application:

`
flask --app app run
`

In order to debug and run the application simultaneusly please use the following command:

`
flask --debug run
`

## How to build in docker

We have created the docker compose file. So, it is easier to run the docker compose directly with the command `docker compose up`.


However, if you want to run it, go to the directiry `./server` and run the following command.

`
docker build -t smart-greenhouse .
`

Then run the docker container

`
docker run -p 5000:5000 smart-greenhouse -d 
`