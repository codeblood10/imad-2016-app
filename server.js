var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;  

var config = { 
    user :'codeblood10', 
    database : 'codeblood10', 
    host : 'db.imad.hasura-app.io',
    port : '5432', 
    password :'db-codeblood10-328'
};
var app = express();
app.use(morgan('combined')); 


function createtemplate( data ) 
{ var title = data.title;
  var date = data.date; 
  var heading = data.heading; 
  var content = data.content; 
  var code = data.code;
  var ref = data.ref;
var htmltemplate = `
<html> 
<head> 
 <title>  
   ${title} 
 </title> 
 <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<link href = "/ui/style.css" ref = "stylesheet"  />
 <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
  <style> 
    .footer{
        background-color: black;
        text-align: center;
        color: white;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom:5px;
        margin-top:200px;
    }
    
    #xoxo{
        padding-bottom: 5px;
        font-weight: bold;
    }
    
    #copy{
        padding-top: 10px;
        font-weight: bold;
    }
    .container{
	    margin-top:20px;
	}
	
    .header{
	    text-align:center;
		font-size:25px;
		font-weight:bold;
	    font-family:cursive;
     }
	
	.pope{
	    text-align:center;
		font-size:15px;
		margin-bottom:30px;
	}
	
	#navbar{
        text-align: center;
        font-size: 15px;
        background-color: darkblue;
        padding-top: 7px;
        padding-bottom: 3px;
    }
	
    #navbar ul{
	    list-style-type:none;
    }
	
    #navbar ul li{
	   display:inline;
	   padding:10px;
    }
    #navbar ul li a {
	    text-decoration:none;
	    color:white;
    }
	
    #navbar ul li a:hover {
	    color:#black;
	    border-top:2px solid;
	    border-bottom:2px solid;
    }
	
	#image{
	    margin-bottom:60px;
	}
  
  </style>
</head> 
<body> 
   <div class = "container" >
      <div>
		    <div  class="header">C.O.S.M.O.S</div>
		    <div class="pope">Coding Open Source Methods Of Solution</div>
		</div>	
		<div id="navbar">
            <ul>
                <li> <a href = "/ui/blog.html" ><span class="glyphicon glyphicon-home"></span></a></li>
                <li><a href="https://guides.github.com/activities/hello-world/">Github tutorial</a></li>
                <li><a href="http://ourcodeworld.com/articles/read/200/top-7-best-free-web-development-ide-for-javascript-html-and-css">Top open sources ide's</a></li>
                <li><a href="www.tutorialspoint.com/listtutorials/linux/1">Learn about linux</a></li>
                <li><a href="https://summerofcode.withgoogle.com/">G-soc google summer of code</a></li> 
                <li><a href ="https://opensource.com/resources/what-open-source">Open source technologies</a>
            </ul>
        </div> 
  
  <h3 style ="text-align: center;"> 
     ${heading} 
  </h3> 
  <hr/>
  <div> 
    ${date.toDateString()} 
  </div> 
  <div class = "row"> 
     <div class ="col-md-12">  
     <h3>Description : </h3>
      ${content}
   </div>  
   </div> 
   <div class = "row"> 
   <div class = "col-md-12"> 
   <h3>Code :</h3> 
      ${code} 
   </div> 
   </div>
   <div class  ="row"> 
   <div class = "col-md-12"> 
    &nbsp;<h3>References :</h3>
        ${ref} 
   </div> 

   </div>
     <div class="footer"   >
            <div id="xoxo">
                follow on:
            </div>
            <div id="follow">
                <a href="https://www.facebook.com/profile.php?id=100003604141055"><img src="/ui/fb.png"></a>&nbsp;&nbsp;
                <a href="https://www.linkedin.com/in/ankit-sharma-9b600410b?trk=nav_responsive_tab_profile"><img src="/ui/li.png"></a>&nbsp;&nbsp;
                <a href="https://plus.google.com/106373746361945588720"><img src="/ui/gp.png"></a>
            </div>
            <div id="copy">
                Copyright reserved @2016-17
            </div>
        </div>
		
		
   </div>
</body>
</html>  
`; 
return htmltemplate;
}


var pool =  new Pool(config);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
 
app.get('/test-db',function(req,res){
     pool.query('SELECT * FROM test',function(err,result){
         if(err) 
         { 
             res.status(500).send(err.toString());
         } else 
         { 
             res.send(JSON.stringify(result.rows)); 
         }
     });
}) ;
app.get('/ui/blog.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});
app.get('/ui/articles/:articlename',function (req, res){ 
    //articlename = article-one
    //article[articlename]=={}content object for  article one  
    var articlename = req.params.articlename; 
   pool.query("SELECT * FROM article WHERE title =$1",[req.params.articlename] ,function(err,result){
       if(err) 
       { 
           res.status(500).send(err.toString ());
       } 
       else 
       { 
           if(result.rows.length === 0) 
           { 
               res.status(404).send('Article not found');
           } 
           else 
           { 
               var articlesData = result.rows[0];
               res.send(createtemplate(articlesData));
           }
       } 
     });
}); 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/home1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home1.jpg'));
});
 
app.get('/ui/berry.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'berry.png')); 
});
app.get('/ui/blog.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.png'));
});

app.get('/ui/profile.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.jpg'));
});

app.get('/ui/bg.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bg.jpg'));
});

app.get('/ui/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});

app.get('/ui/li.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'li.png'));
});

app.get('/ui/gp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gp.png'));
}); 
app.get('/ui/js.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'js.jpg'));
});
app.get('/ui/comp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'comp.png'));
});
app.get('/ui/andriod.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'andriod.jpg'));
});
app.get('/ui/git.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'git.jpg'));
});
app.get('/ui/http.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'http.jpg'));
});
app.get('/ui/java.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'java.jpg'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
