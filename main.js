const express=require("express");
const app=express();
app.use(express.static("pages"));
const Userregister=require('./schema/userlogin');
const Sellerregister=require('./schema/sellerlogin');
const session=require('express-session');
app.use(session({secret:'project'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://saicharanbhogi:rssscharan.1352@cluster0.fcbfo.mongodb.net/capstoneproject?retryWrites=true&w=majority').then(()=>{
    console.log("Connected to mongodb")
});
const connection=mongoose.connection;
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/login-register.html")
});
app.post("/userregister",(req,res)=>{
    var a=req.body.ufname;
    var b=req.body.ulname;
    var c=req.body.usermail;
    var d=req.body.upassword;
    var e=req.body.umobilenumber;
    Userregister.findOne({usermail:c,mobilenumber:e},(err,result)=>{
        if(!err)
        {
            if(result==null)
            {
                Userregister.create({
                    firstname:a,
                    lastname:b,
                    usermail:c,
                    password:d,
                    mobilenumber:e,
                },function(err){
                    if(err)
                    console.log('Something Went wrong'+err);
                    else
                    console.log('User registered');
                    res.redirect('/')
                });
            }
            else{
                res.redirect("/")
            }
        }
        else{

        }
    })

});
app.post("/userlogin",(req,res)=>{
    a=req.body.lemail;
    b=req.body.lpassword;
    Userregister.findOne({username:a,password:b},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result == null)
            {
                res.redirect("/")
            }
            else{
                res.redirect('/home');
            }
        }
        
    })
})
app.post("/sellerregister",(req,res)=>{
    var a=req.body.sname;
    var b=req.body.sgst;
    var c=req.body.semail;
    var d=req.body.spassword;
    var e=req.body.smobilenumber;
    console.log(a);
    Sellerregister.findOne({sellermail:c,mobilenumber:e},(err,result)=>{
        if(err)
        {
            res.send()
        }
        else
        {
            if(result==null)
            {
                Sellerregister.create({
                    sellername:a,
                    gstno:b,
                    sellermail:c,
                    password:d,
                    mobilenumber:e,
                },function(err){
                    if(err)
                    {
                        console.log('Something Went wrong'+err);
                    }
                    else
                    {
                        console.log('Seller registered');
                        res.redirect('/loginseller')
                    }
                });
            }
            else{
                res.redirect("/loginseller")
            }
        }
    })

});
app.post("/sellerlogin",(req,res)=>{
    a=req.body.seemail;
    b=req.body.password;
    Sellerregister.findOne({sellermail:a,password:b},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result == null)
            {
                res.redirect("/loginseller")
            }
            else{
                res.redirect('/home');
            }
        }
        
    })
})
app.get("/home",(req,res)=>{
  res.sendFile(__dirname+"/pages/main.html");
});
app.get("/loginseller",(req,res)=>{
    res.sendFile(__dirname+"/pages/seller-login.html")
});
app.get("/checkout",(req,res)=>{
    res.sendFile(__dirname+"/pages/checkout.html")
});
app.get("/product",(req,res)=>{
    res.sendFile(__dirname+"/pages/single-product.html")
});
app.get("/cart",(req,res)=>{
    res.sendFile(__dirname+"/pages/shopping-cart.html")
});
app.get("/shopcart",(req,res)=>{
    res.sendFile(__dirname+"/pages/shop-list-left-sidebar.html")
});
app.get("/logout",(req,res)=>{
    res.sendFile(__dirname+"/pages/login-register.html")
});
app.get("/about",(req,res)=>{
    res.sendFile(__dirname+"/pages/about-us.html")
});
app.get("/compare",(req,res)=>{
    res.sendFile(__dirname+"/pages/compare.html")
});
app.get("/contact",(req,res)=>{
    res.sendFile(__dirname+"/pages/contact.html")
});
app.get("/faq",(req,res)=>{
    res.sendFile(__dirname+"/pages/faq.html")
});
app.get("/wishlist",(req,res)=>{
    res.sendFile(__dirname+"/pages/wishlist.html")
});

app.get("/userupdatepassword",(req,res)=>{
    res.sendFile(__dirname+"/pages/updatepassword.html")
});
app.post("/userupdatepassword",(req,res)=>{
    a=req.body.newpassword;
    b=req.body.rnewpassword;
    c=req.body.email;
    if(a===b){
        Userregister.updateOne({usermail:c,password:a},function(err,result){
            if(err){
                console.log(err)  
            }
            else{
                if(result.modifiedCount==0)
                {
                    res.redirect('/userupdatepassword');
                }
                else{
                    console.log(result);
                    res.redirect('/');
                } 
                
            }
        });
    }
    else{
        res.redirect("/userupdatepassword")
    }
    
});



app.get("/sellerforgotpassword",(req,res)=>{
    res.sendFile(__dirname+"/pages/sforgotpassword.html")
});

app.post("/sellerforgotpassword",(req,res)=>{
    a=req.body.email;
    if(!a){
        res.redirect("/sellerforgotpassword");
    }
    else{
        res.redirect("/sellerupdatepassword");
    }
});

app.get("/sellerupdatepassword",(req,res)=>{
    res.sendFile(__dirname+"/pages/supdatepassword.html")
});
app.post("/sellerupdatepassword",(req,res)=>{
    a=req.body.newpassword;
    b=req.body.rnewpassword;
    c=req.body.email;
    if(a===b){
        Sellerregister.updateOne({usermail:c,password:a},function(err,result){
            if(err){
                console.log(err)  
            }
            else{
                if(result.modifiedCount==0)
                {
                    res.redirect('/suserupdatepassword');
                }
                else{
                    console.log(result);
                    res.redirect('/');
                } 
                
            }
        });
    }
    else{
        res.redirect("/suserupdatepassword")
    }
    
});



app.get("/sellerforgotpassword",(req,res)=>{
    res.sendFile(__dirname+"/pages/sforgotpassword.html")
});

app.post("/sellerforgotpassword",(req,res)=>{
    a=req.body.email;
    if(!a){
        res.redirect("/sforgotpassword");
    }
    else{
        res.redirect("/supdatepassword");
    }
});


app.get("/addproduct",(req,res)=>{
    res.sendFile(__dirname+"/pages/forgotpassword.html")
});

app.listen(3000,()=>{
    console.log("Server started!!");
})