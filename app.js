const express     =       require("express"),
    app         =       express(),
    bodyParser  =       require("body-parser"),
    mongoose    =       require("mongoose"),
    Campground  =       require("./models/campground.js"),
    seedDB    =       require("./seeds");
    
    
mongoose.connect("mongodb://localhost/yelp_camp_v2_1",{ useNewUrlParser: true }); //connects to the *running mongo server in the other terminal window 
app.use(bodyParser.urlencoded({extended: true})); /*
                                                        Enables the use of
                                                        'body-parser' dependency
                                                    */
app.set("view engine", "ejs"); //makes the end '.ejs' inherent in render files. 
seedDB(); 

//INDEX ROUTE - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req,res){  //creates path for campgrounds
    //get all campgrounds from DB   //most things will have a call back function
    Campground.find({}, function(err,allCampgrounds){
        err ? console.log(err) : res.render("index", {campgrounds: allCampgrounds});  
    });
});

app.get("/",(req,res) => res.render("landing"));    //
    //rest technique for routes == campground page, but need new campground
        //post route with the same name as CG page 
//CREATE ROUTE - ADD NEW CAMPGROUD TO DB
app.post("/campgrounds", (req, res) => {     
    //get data from form and add to camp array
    let name = req.body.name; //selects the name
    let image = req.body.image;
    let description = req.body.description;                              //and image
    let newCampground = {name:name,image:image,description: description}; //just like on line 19
    //create a new campground and save to DB
    Campground.create(newCampground, (err,newlyCreated) => err ? console.log(err) : res.redirect("/campgrounds"));                                           
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND 
app.get("/campgrounds/new", (req, res) => res.render("new"));

//SHOW - SHOWS MORE INFO ABOUT A PARTICULAR CAMPSITE 
app.get("/campgrounds/:id", (req, res) => {
    //find campground with provided ID. 
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
           err ? console.log(err) : res.render("show", {campground: foundCampground}); 
    });
    //render show template with that campground.
});
app.listen(process.env.PORT, process.env.IP, () => console.log("YelpCamp is listening"));