const express =require("express");

const Bodyparser=require("body-parser");//envoyer les data de post vers le serveur 

const request=require("request");

const app = express(); // instance de express


//_____________________________________________________________________________________________


app.use(express.static("public"));// pour que notre serveur servira des page static on doit utiliser un fonction express static
app.use(Bodyparser.urlencoded({extended : true}));// pour utiliser body parser il faut utiliser sa methode urlencoded recuperer les donné posté dans post

//________________________________________________________________________________________________





app.get("/",function(req , res ){

    res.sendFile(__dirname+"/singUp.html");
});






//____________________________________poster les data


app.post("/",function(req,res){

    var fname = req.body.fname;
    var lname= req.body.lname;
    var mail =req.body.mail;

    var data = {
        members:[//array of objects
            {
                email_address : lname,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME :mail
                }
            }
        ]
    };

    var jsondata =JSON.stringify(data);

    //____________un fois post depuis forms les donné seront posté a traver app.post quui va appelé la fonction request qui va utilisé les donnee de option pour poster les donné dans mailchimps

 var options={//c'est un objet auqeul on post et non pas on recuperer les donné de notre forme dans mailchimps via cet url 

    url: "https://us4.api.mailchimp.com/3.0/lists/818a8a809d",
    method: "POST",
    headers : {// section pour audenthifier dans le serveur
        "Authorization": "Naziha f83ae23bbcd9a16154569840d8fc682e-us4 " // object   
    },
     body: jsondata
    }




    //___________________________________________________________


 request(options,function(error,response,body){ 
 //ici dans cette fonction  on envois la requette de post dans le serveur mailchimps

 if (error){
    // console.log(error);
    res.sendFile(__dirname+"/failure.html");
 }
 else
     if(response.statusCode===200){

    res.sendFile(__dirname+"/success.html");
 } else {
    res.sendFile(__dirname+"/failure.html");
 }
 
    });
 

    
});



app.post("/failure",function(req,res){
    console.log("ok");

    res.redirect("/");
 });
 



//_______________________________________________________________________________________________


app.listen(3000 || process.env.PORT,function(){//port 3000 il est local et une fois deployé il marcherai dans leur serveur avec un port specifique
    console.log("port running on port 3000");
});


//incorporer notre api (interagir avec mail chimps server a traver notre api)





// api key f83ae23bbcd9a16154569840d8fc682e-us4 pour interragir avec les serveur mailchimps
// audiance id  2a2f450cb0 pour s'authentifier a la list d'audiance souhaité 

//__________________________deploy ower web app 


//github support only static content 

// 1/install heroku 
// 2/login in heroku
// 3/creat a port
// 4/creat a procfile
// 5/save in github
// 6/heroku create (creer notre serveur notre container)
// 7/hit push heroku master (inclure nos fichier dans l serveur )
//PROCFILE cest un fichier qui permet a hheroku de le consulter pour savoir quel commande a excuter pour lance l'app


//______________________regiter ower project into git versioning
//git init
//git add . 
// gitt commit -m "first version"



//versioning 
// si on veut modifier dans le code et lance une nouvelle version : 
// modifier dans le fichier js 
// enrgisterer la version dans git 
// //git init
// //git add . 
// // gitt commit -m "first version"
// ghit push heroku master (inclure nos fichier dans l serveur )



