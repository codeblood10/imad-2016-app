var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined')); 

var articles  = { 
 'article-one' : { 
    title:'Article one | ankit sharma', 
    heading : 'article-one' ,
    date : 'sep, 5,2016', 
    content : 
    `<p> 
    this is my first article on my web page hosted on my very own url ok done 
    </p>
    <p> 
    this is my first article on my web page hosted on my very own url ok done 
    </p>
    <p> 
    this is my first article on my web page hosted on my very own url ok done 
    </p> `
 }, 
 'article-two' : { 
    title:'Article two | ankit sharma', 
    heading : 'article two' ,
    date : 'sep, 15,2016', 
    content : 
    `<p> 
    this is my second article on my web page hosted on my very own url ok done 
    </p>`
   
 } ,  
 'article-three' : { 
    title:'Article three | ankit sharma', 
    heading : 'article three' ,
    date : 'sep, 10,2016', 
    content : 
    `<p> 
    this is my third article on my web page hosted on my very own url ok done 
    </p>`
    
 }
  
};
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
    ${date} 
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





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articlename',function (req, res){ 
    //articlename = article-one
    //article[articlename]=={}content object for  article one  
    var articlename = req.params.articlename;
res.send(createtemplate(articles[articlename]));
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



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
