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
var htmltemplate = `
<html> 
<head> 
 <title>  
   ${title} 
 </title> 
 <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<link href = "/ui/style.css" ref = "stylesheet"  />
</head> 
<body> 
   <div class = "container">
  <div> 
  <a href = "/" >home</a> 
  </div> 
  <hr/> 
  <h3> 
     ${heading} 
  </h3> 
  <div> 
    ${date.toDateString()} 
  </div> 
  <div> 
     ${content}
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
app.get('/articles/:articlename',function (req, res){ 
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


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
