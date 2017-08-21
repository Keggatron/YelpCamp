var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name:"Granite Hill", 
        image:"https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {
        name:"Prelude Lake", 
        image:"https://nwtparks.ca/sites/default/files/styles/side_bar_gallery_main_image/public/prelude_-_panoramic_trail_002.jpg?itok=v4qFdWtv",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Lady Evelyn Falls", 
        image:"https://nwtparks.ca/sites/default/files/styles/side_bar_gallery_main_image/public/0507_dc-018_lady_evelyn_falls_yoga_lady_briony_wright_7x11.jpg?itok=TVPPE9zr",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground!");
                    // create a comment
                    Comment.create(
                        {
                            text:"This place is great",
                            author:"Homer"
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment!");
                            }
                        });
                }
            });
        });
    });
    
    // add a few comments
}

module.exports = seedDB;