const express = require("express");
const path = require("path");
const app = express();

// EJS setup
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for form data
app.use(express.urlencoded({extended:true}));

// Static files (images, css)
app.use(express.static("public"));


app.use((req,res,next)=>{
   const start = Date.now();

   res.on("finish", ()=>{
      const time = Date.now() - start;
      console.log(`${req.method} ${req.url} - ${time}ms`);
   });

   next();
});



const users = [
  {name:"Shivam"},
  {name:"Rohit"},
  {name:"Priya"},
  {name:"Ankit"}
];

let posts = [
  {id:1, title:"First Post", content:"Hello world"},
  {id:2, title:"Express Guide", content:"Learning Express is fun"}
];



app.get("/users",(req,res)=>{
   const search = req.query.name;

   let filtered = users;

   if(search){
      filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
   }

   res.render("users",{users:filtered});
});



app.get("/contact",(req,res)=>{
   res.render("contact");
});

app.post("/contact",(req,res)=>{
   const {name,email,message} = req.body;
   console.log("Form Data:",name,email,message);
   res.send("Form submitted successfully!");
});



app.get("/gallery",(req,res)=>{
   const images = ["chameleon.jpg","parrot.jpg","butterfly.jpg"];
   res.render("gallery",{images});
});



app.get("/posts",(req,res)=>{
   res.render("posts",{posts});
});


app.get("/posts/:id",(req,res)=>{
   const post = posts.find(p=> p.id == req.params.id);
   res.render("post",{post});
});


app.get("/posts/new",(req,res)=>{
   res.render("newPost");
});


app.post("/posts",(req,res)=>{
   const {title,content} = req.body;

   const newPost = {
      id: posts.length + 1,
      title,
      content
   };

   posts.push(newPost);
   res.redirect("/posts");
});



app.use((req,res)=>{
   res.status(404).render("404");
});

app.listen(3000,()=> console.log("Server running on port 3000"));
