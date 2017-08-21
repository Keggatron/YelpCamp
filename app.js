var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds")
    
// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
// mongodb://localhost/yelp_camp_v13
mongoose.connect("mongodb://admin:admin@ds151433.mlab.com:51433/yelpcamp-keggatron", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// Connecting CSS Stylesheet Video 281 - Serving public directory to link to
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database   

// PASSPORT CONFIGURATION
 app.use(require("express-session")({
     secret: "Once again Rusty wins cutest dog!",
     resave:false,
     saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new  LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 
 
//  explained in video 293 - middleware to add currentUser to all routes instead of copying and pasting
 app.use(function(req,res,next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
 });
 
 app.use(indexRoutes);
 app.use("/campgrounds/:id/comments", commentRoutes);
 app.use("/campgrounds", campgroundRoutes);
 
 


app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("The YelpCamp server has started!!");
});