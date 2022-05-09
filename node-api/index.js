var client = require('@mailchimp/mailchimp_marketing');
var express = require('express');
var app = express();
var request = require('request');


var options = {
  'method': 'GET',
  'url': 'https://rest.gohighlevel.com/v1/contacts/',
  'headers': {
    'Authorization': 'Bearer d2da8d01-ba3e-422d-ab3d-0bd94a67ee4c'
  }
};

app.get("/",(req,res)=>{
   res.send("hi you are successfully entered the home page");
});

app.get("/ghl",(req,res)=>{
  request(options, function (error, response) {
  if (error) throw new Error(error);
  var data = response.body;
  var converted = JSON.parse(data);
  res.json(converted.contacts);
  console.log(typeof(converted));

});
});

app.get("/mailchimp",(req,res)=>{
  
  const runs = async () => {
  const response = await client.lists.getListMembersInfo("cd15db0f41");
  // const response = await client.lists.getAllLists();
  res.json(response);
 
};
runs();
});

app.get("/mailchimp-to-ghl",(req,res)=>{
	 request(options, function (error, response) {
     if (error) throw new Error(error);
     var data = response.body;
     var converted = JSON.parse(data);
     var extdata = converted.contacts;
    
     var email = extdata[6].email
     var firstName = extdata[6].firstName
     var lastName = extdata[6].lastName

     for(rdata in extdata){
     	var email = extdata[rdata].email
        var firstName = extdata[rdata].firstName
        var lastName = extdata[rdata].lastName

     var run = async () => {
     var response = await client.lists.addListMember("cd15db0f41", {
     email_address: email,
     status: "subscribed",
     merge_fields: {
        "FNAME": firstName,
        "LNAME": lastName
        },

    });
    console.log(response);
    res.send(response);
    };
    run();
        continue;
     }

     

     
});


});

app.get("/post",(req,res)=>{
var run = async () => {
  var response = await client.lists.addListMember("cd15db0f41", {
    email_address: "testing5@gmail.com",
    status: "subscribed",
    merge_fields: {
        "FNAME": "testingA2",
        "LNAME": "lasttesting2"
        
        },

  });

  console.log(response);
  res.send(response);

};
run();
});








app.listen("1000",()=>{
	console.log("successfull listen");
});
