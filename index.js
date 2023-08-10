const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/list');
const List = require('./models/list');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: String
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){


    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})
app.post('/create-list', function(req, res){
    
    
    List.create({
        name: req.body.name,
    }, function(err, newList){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newList);
            return res.redirect('back');
    })
  

});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});
