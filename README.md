

This is the Documentation of YelpCamp v2.1

==========================================


The technology i used in this project (Colt Steele's)
are ejs, express, mongoose, and an npm package called bodyParser


The routes that are made follow the basic of RESTFUL routes 

one route to POST a new campground to the mongoDB database
one route to populate a generic info ejs template, then send a GET request to the database. 

two routes for 
1. displaying the landing page 
2. 2. displaying the new campground page that sends a POST request



excluding the last .listen() method for running the node app 

there are 4 other methods to be run in order to get the dependencies all together 
1. mongoose.connect(`insert the location address for your MongoDB database', {an object for any setting you need changed})
2. app.use(bodyParser.urlencoded({extended: true}));  I just used this for troubleshooting in C9
3. app.set("view engine", "ejs"); helps so you dont always have to write '.ejs' after every file reference
4. seedDB(); 


seedDB() {
    SO basically this deletes the data in the mongo databse, 
        then repopulates the database with the data object array in the seeds.js file
        everytime you start the application 
            because this is assuming your database is not running 
                all the time. 
}
