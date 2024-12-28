### Running the app (ExpressJs Application & MongoDB)

1.  Install latest node js (lts) https://nodejs.org/en

2.  Clone the repository
    HTTPS: https://github.com/mrvndve/smartnonsense-api.git
    SSH: git@github.com:mrvndve/smartnonsense-api.git

3.  On your terminal type **npm install** to install all the packages used for the application

4.  Create an .env file to the root folder of the project and copy/paste the contents of .env-example file it is also located on the root folder.

    **Note**: this is required since the authentication keys and datatase connection of the application is reliable on the environment configs

5.  Once the packages installed on your terminal type **npm run dev** to run the application.

6.  Once the app running you can check the database by viewing it on the MongoDB Compass since I used MongoDB (NoSQL) you can download it here: https://www.mongodb.com/try/download/compass

7.  Now open the MongoDB Compass and create a new connection by inputting the connection string here:
    mongodb+srv://supermarvs0021:q5mQ4hudmpMVfq1x@smartnonsense.nialy.mongodb.net/smartnonsense

        **Note**: I used MongoDB Atlas a multi-cloud database service (free plan) but via connecting it on your MongoDB compass GUI you will be able to manipulate the database
