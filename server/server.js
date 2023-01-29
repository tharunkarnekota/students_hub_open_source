const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const dotenv = require('dotenv');
const sendEmail = require('./sendmail')
const crypto = require('crypto')

////

const users = require('./usermodel')                              //students in college
const messagemodel = require('./messagemodel')                      //message from friends
const registerloginmodel = require('./registerloginmodel')
const mentorsmodel = require('./mentorsmodel')
const studentprojectmodel = require('./studentprojectmodel')       //projects
const wantedmodel = require('./wantedmodel')                       //requirements

const aluminimodel = require('./aluminimodel')
const teachersmodel = require('./teachersmodel')
const resourcemodel = require('./resourcemodel')
const Internshipmodel = require('./Internshipmodel');
const contactmodel = require('./contactmodel')
const supportteammodel = require('./supportteammodel')






const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000


// mongoose.connect(process.env.CONNECTION_URL).then(
//     ()=> console.log('Db connected..')
// )

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.CONNECTION_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

app.use(express.json());
app.use(cors({origin:"*"}));






app.get('/',(req,res)=>{
    res.send('Hello to VJIT Students HUB API 26-12-2022 22:30');
})







// registration of students
app.post('/register',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,skill,password,confirmpassword } = req.body;
        const exist = await users.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        const existId = await users.findOne({collegeId});
        if(existId){
            return res.status(200).send('this collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new users({
            fullname,collegeId,branch,email,mobile,skill,password,
            confirmpassword,
            msg:"allow"
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})


// login for both students and alumini
app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        let exist = await users.findOne({email})
        if(!exist){
            exist = await aluminimodel.findOne({email})
        }
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token:token,id:exist.collegeId})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})




// // // register login -- -- --
app.post('/addregisterlogin',middleware,async(req,res)=>{
    try{
        const {username,password} = req.body;
        
        const newdata = new registerloginmodel({
            username,
            password
        })
        await newdata.save();
        return res.status(200).send('registerLogin Details saved successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addregisterlogin Server Error ')
    }
})

app.get('/getregisterlogin',middleware,async(req,res)=>{
    try{
        const exist = await registerloginmodel.find()
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getregisterlogin Server Error')
    }
})

app.post('/verifyregisterlogin',async(req,res)=>{
    try{
        const {username,passwordv} = req.body;
        const exist = await registerloginmodel.findOne({username});
        if(!exist)
        {
            return res.status(200).send('failure')
        }
        if(exist.password !== passwordv)
        {
            return res.status(200).send('failure') 
        }
        if(exist.password === passwordv)
        {
            return res.status(200).send('success') 
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addregisterlogin Server Error ')
    }
})
/////////////



//get all students profilew
app.get('/allprofiles',middleware,async (req,res) =>{
    try{
        let allprofiles = await users.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('allprofiles Server Error')
    }
})


//loggined user info
app.get('/myprofile',middleware, async (req,res)=>{
    try{
        let myprofile = await users.findById(req.user.id);
        if(!myprofile)
        {
            myprofile = await aluminimodel.findById(req.user.id);
        }
        return res.json(myprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})


//individual student profile of other students of college
app.get('/indprofilee/:id',middleware, async (req,res)=>{
    try{
        let indprofile = await users.findById(req.params.id);
        return res.json(indprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})


//update skill from myprofile
app.put('/updatemyprofile/:id',middleware,async (req,res)=>{
    try{
        const {newSkill} = req.body
        await users.findByIdAndUpdate(req.params.id,{
            skill : newSkill || "c",
        })
        let myprofile8 = await users.findById(req.user.id);
        return res.status(200).json({message:"successfully updated your new skills",update:myprofile8});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemyprofile Server Error')
    }
})


//update github from myprofile
app.put('/updatemygithub/:id',middleware, async (req,res)=>{
    try{
        const {newgithub} = req.body
        await users.findByIdAndUpdate(req.params.id,{
            github : newgithub || "-",
        })
        let myprofile9 = await users.findById(req.user.id);
        return res.status(200).json({message:"successfully Added github",update:myprofile9}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemygithub Server Error')
    }
})


//update linkedin from myprofile
app.put('/updatemylinkedin/:id',middleware, async (req,res)=>{
    try{
        const {newlinkedin} = req.body;
        await users.findByIdAndUpdate(req.params.id,{
            linkedin : newlinkedin || "-", 
        })
        let myprofile9 = await users.findById(req.user.id);
        return res.status(200).json({message:"successfully Added linkedin ",update:myprofile9});  
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemylinkedi  Server Error')
    }
})


//update project from myprofile
app.put('/updatemyproject/:id',middleware, async (req,res)=>{
    try{
        const {project} = req.body
        await users.findByIdAndUpdate(req.params.id,{
            project : project || "-",
        })
        let myprofile9 = await users.findById(req.user.id);
        return res.status(200).json({message:"successfully updated project",update:myprofile9});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemyproject Server Error')
    }
})


// msg from frients
app.get('/myreview',middleware,async (req,res)=>{
    try{
        let allreviews = await messagemodel.find();
        let myreviews = allreviews.filter(review => review.messageReceiver.toString() === req.user.id.toString());
        return res.status(200).json(myreviews)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myreview Server Error')
    }
})

app.delete('/deletereview/:id',middleware,async(req,res) => {
    try{
        await messagemodel.findByIdAndDelete(req.params.id)
        let allreviews = await messagemodel.find();
        let myreviews = allreviews.filter(review => review.messageReceiver.toString() === req.user.id.toString());
        return res.status(200).json({message:"Message deleted successfully",update:myreviews})
    }
    catch(err){
        console.log(err)
    }
})
//

//update description from myprofile
app.put('/updatemydescription/:id',middleware, async (req,res)=>{
    try{
        const {description} = req.body
        await users.findByIdAndUpdate(req.params.id,{
            description : description || "-",
        })
        let myprofile9 = await users.findById(req.user.id);
        return res.status(200).json({message:"successfully updated bio",update:myprofile9});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemydescription Server Error')
    }
})


// block msg in myprofile
app.put('/msgblock/:id', async (req,res)=>{
    try{
        await users.findByIdAndUpdate(req.params.id,{
            msg : "block"
        })
        let myprofile5 = await users.findById(req.params.id);
        return res.status(200).json({message:"successfully blocked messages",update:myprofile5});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('msgblock Server Error')
    }
})


//allow msg in myprofile
app.put('/msgallow/:id', async (req,res)=>{
    try{
        await users.findByIdAndUpdate(req.params.id,{
            msg : "allow" 
        })
        let myprofile5 = await users.findById(req.params.id);
        return res.status(200).json({message:"successfully Allows messages",update:myprofile5});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('msgallow Server Error')
    }
})


//delete complete account of current user
app.delete('/delete/:id',middleware,async(req,res) => {
    try{
        await users.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})


//individual profile of selected student
app.get('/indprofilee/:id',middleware, async (req,res)=>{
    try{
        let indprofile = await users.findById(req.params.id);
        return res.json(indprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})


//review or msg from friends in individual profile
app.post('/addreview',middleware,async (req,res)=>{
    try{
        const {messageReceiver,message} = req.body;
        let exist = await users.findById(req.user.id)
        if(!exist){
            exist = await aluminimodel.findById(req.user.id)
        }
        const newReview = new messagemodel({
            messageSender : exist.email,
            messageSenderId : exist._id,
            messageSenderclgId : exist.collegeId,
            messageReceiver,
            message
        })
        newReview.save();
        return res.status(200).send('Message Sent successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addreview Server Error')
    }
})


//get info of present user
app.get('/getpresentuser',middleware,async(req,res)=>{
    try{
        let exist = await users.findById(req.user.id)
        if(!exist){
            exist = await aluminimodel.findById(req.user.id)
        }
        return res.status(200).json(exist.role);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getpresentuser Server Error')
    }
})

//get info of present user
app.get('/getpresentuserid',middleware,async(req,res)=>{
    try{
        let exist = await users.findById(req.user.id)
        return res.status(200).json(exist.collegeId);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getpresentuserid Server Error')
    }
})







// // // project -- -- --
app.post('/addstudentproject',middleware,async(req,res)=>{
    try{
        const {name,clgid,category,projecttitle,projectdescription,github,video,website} = req.body;
        
        const newstudentproject = new studentprojectmodel({
            name,
            clgid,
            category,
            projecttitle,
            projectdescription,
            github,
            video,
            website
        })
        await newstudentproject.save();
        let projectts = await studentprojectmodel.find();
        return res.status(200).json({message:'project saved successfully',update:projectts})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addproject Server Error ')
    }
})

app.get('/getstudentproject',middleware,async(req,res)=>{
    try{
        let projectts = await studentprojectmodel.find();
        if(projectts.length>=1){
            return res.status(200).json(projectts);
        }
        else{
            return res.status(200).json([]);
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})
//////






// // // requirements -- -- --
app.post('/addrequirements',middleware,async(req,res)=>{
    try{
        const {skillsreq,theme} = req.body;
        const exist = await users.findById(req.user.id)
        const newwanted = new wantedmodel({
            userid : exist.id,
            clgid : exist.collegeId,
            name : exist.fullname,
            skillsreq,
            theme
        })
        await newwanted.save();
        let allreq = await wantedmodel.find();
        return res.status(200).json({message:'requirements added successfully',update:allreq})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})

app.get('/getrequirements',middleware,async (req,res) =>{
    try{
        let allreq = await wantedmodel.find();
        return res.json(allreq);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('allprofiles Server Error')
    }
})

app.delete('/deleterequirement/:id',middleware,async(req,res) => {
    try{
        await wantedmodel.findByIdAndDelete(req.params.id)
        let allreq = await wantedmodel.find();
        return res.status(200).json({message:'requirements deleted successfully',update:allreq})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).send('deleterequirement Server Error')
    }
})
/////////




// // // contact us -- -- --

//team of support
app.post('/addsupportteam',middleware,async(req,res)=>{
    try{
        const {name,clgid,position,mobile,email} = req.body;
        
        const newsupportteam = new supportteammodel({
            name,
            clgid,
            position,
            mobile,
            email
        })
        await newsupportteam.save();
        let exist = await supportteammodel.find();
        return res.status(200).send({message:'team member saved successfully',update:exist})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addsupportteam Server Error ')
    }
})

app.get('/getsupportteam',middleware,async(req,res)=>{
    try{
        let exist = await supportteammodel.find();
        if(exist.length>=1){
            return res.status(200).json(exist);
        }
        else{
            return res.status(200).json(sample);
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})
//


app.post('/addquery',middleware,async(req,res)=>{
    try{
        const {problem} = req.body;
        let exist = await users.findById(req.user.id)
        if(!exist){
            exist = await aluminimodel.findById(req.user.id)
        }
        const newquery = new contactmodel({
            userid : exist.id,
            username : exist.fullname,
            clgid : exist.collegeId,
            problem
        })
        await newquery.save();
        return res.status(200).send('your problem sent successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})

app.get('/getquery',middleware,async(req,res) => {
    try{
        let allqueries = await contactmodel.find();
        return res.json(allqueries);
    }
    catch{
        console.log(err);
        return res.status(500).send('getquery Server Error')
    }
})

app.delete('/deletequery/:id',middleware,async(req,res) => {
    try{
        await contactmodel.findByIdAndDelete(req.params.id)
        let allqueries = await contactmodel.find();
        return res.status(200).json({message:'query deleted successfully',update:allqueries})
    }
    catch(err){
        console.log(err)
    }
})
////////





// // // resources -- -- --
app.post('/addresource',middleware,async(req,res)=>{
    try{
        const {Rname,Resourcedescription,weburl,pic} = req.body;
        const newresource = new resourcemodel({
            Rname,
            Resourcedescription,
            weburl,
            pic
        })
        await newresource.save();
        let allresources = await resourcemodel.find();
        return res.status(200).json({message:'new resource added successfully',update:allresources})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('add resourceServer Error')
    }
})

app.get('/getresource',middleware,async(req,res)=>{
    try{
        let allresources = await resourcemodel.find();
        return res.json(allresources);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('get resource Server Error')
    }
})
/////////



// // // mentors -- -- --
app.post('/addmentor',middleware,async(req,res)=>{
    try{
        const {mentorname,clgId,dept,mobile,email,domains,expert} = req.body;
        
        const newmentor = new mentorsmodel({
            mentorname,
            clgId,
            dept,
            mobile,
            email,
            domains,
            expert
        })
        await newmentor.save();
        let allmentors = await mentorsmodel.find();
        return res.status(200).json({message:'new mentor added successfully',update:allmentors})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('add mentor Server Error')
    }
})

app.get('/getmentors',middleware,async(req,res)=>{
    try{
        let allmentors = await mentorsmodel.find();
        return res.json(allmentors);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('get mentor Server Error')
    }
})
/////////




// // // internship -- -- --
app.post('/addinternship',middleware,async(req,res)=>{
    try{
        const {compName,compWebsite,description,requirements,mobile,email,expDate,stipend,applyPage,role} = req.body;
        
        const newinternship = new Internshipmodel({
            compName,compWebsite,description,requirements,mobile,email,expDate,stipend,applyPage,role
        })
        await newinternship.save();
        let allinternships = await Internshipmodel.find();
        return res.status(200).json({message:'new Internship added successfully',update:allinternships})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('add internship Server Error')
    }
})

app.get('/getinternship',middleware,async(req,res)=>{
    try{
        let allinternships = await Internshipmodel.find();
        return res.json(allinternships);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('get internship Server Error')
    }
})
//////////



//forget password for students
app.post('/forgetpassword',async(req,res,next)=>{
    //checking if atleast the users exists or not
    const tuser= await users.findOne({email:req.body.email});

    if(!tuser){
        return res.status(200).send('user not found')
    }

    // get resetpassword token
    const resetToken= tuser.getResetPassword();
    // // console.log(resetToken);
    await tuser.save({validateBeforeSave: false});

    //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
    //can change we use req._
    const resetpasswordURL=`${resetToken}`;
    const resetpasswordMessage = `your's Students Hub reset password verification code is \n\n ${resetpasswordURL} \n\n if u have not
    requested this email, please ignore`;

    try{
        await sendEmail({
            //we will send a object with 3 key value pairs here
            email:tuser.email,
            subject:"Students Hub password Recovery",
            resetpasswordMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${tuser.email} successfully`,
        })
    }
    catch(err){
        tuser.resetPasswordToken= undefined;
        tuser.resetPasswordExpire= undefined;
        await tuser.save({validateBeforeSave: false});

        return  res.status(200).send(err.message);
    }
}
)



//reset password using forgot password
app.post('/resetpassword/:token',async(req,res,next)=>{
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

    const tuser = await users.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now()},
    })

    if(!tuser){
        return res.status(200).send('password reset token is invalid or expired')
    }

    if(req.body.password !== req.body.confirmpassword){
        return res.status(200).send('password did not match')
    }

    tuser.password = req.body.password;
    tuser.confirmpassword = req.body.password;
    tuser.resetPasswordToken= undefined;
    tuser.resetPasswordExpire= undefined;

    await tuser.save();

    return  res.status(200).send("password changed successfully");

})



//forget password for alumini
app.post('/forgetpasswordalumini',async(req,res,next)=>{
    //checking if atleast the users exists or not
    const tuser= await aluminimodel.findOne({email:req.body.email});

    if(!tuser){
        return res.status(200).send('user not found')
    }

    // get resetpassword token
    const resetToken= tuser.getResetPassword();
    // // console.log(resetToken);
    await tuser.save({validateBeforeSave: false});

    //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
    //can change we use req._
    const resetpasswordURL=`${resetToken}`;
    const resetpasswordMessage = `your's Students Hub reset password verification code is \n\n ${resetpasswordURL} \n\n if u have not
    requested this email, please ignore`;

    try{
        await sendEmail({
            //we will send a object with 3 key value pairs here
            email:tuser.email,
            subject:"Students Hub password Recovery",
            resetpasswordMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${tuser.email} successfully`,
        })
    }
    catch(err){
        tuser.resetPasswordToken= undefined;
        tuser.resetPasswordExpire= undefined;
        await tuser.save({validateBeforeSave: false});

        return  res.status(200).send(err.message);
    }
}
)



//reset password using forgot password
app.post('/resetpasswordalumini/:token',async(req,res,next)=>{
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

    const tuser = await aluminimodel.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now()},
    }) 

    if(!tuser){
        return res.status(200).send('password reset token is invalid or expired')
    }

    if(req.body.password !== req.body.confirmpassword){
        return res.status(200).send('password did not match')
    }

    tuser.password = req.body.password;
    tuser.confirmpassword = req.body.password;
    tuser.resetPasswordToken= undefined;
    tuser.resetPasswordExpire= undefined;

    await tuser.save();

    return  res.status(200).send("Alumini password changed successfully");

})





// // // Teachers -- -- --
app.post('/addteacher',middleware,async(req,res)=>{
    try{
        const {teacherName,
                teacherDepartment,
                teacherRole,
                teacherqualification,
                teachermob,
                teacheremail,
                teachersub  } = req.body;
        
        const newteacher = new teachersmodel({
            teacherName,
            teacherDepartment,
            teacherRole,
            teacherqualification,
            teachermob,
            teacheremail,
            teachersub 
        })
        await newteacher.save();
        const exist = await teachersmodel.find()
        return res.status(200).json({message:'New Teacher Added successfully',update:exist})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('New Teacher Server Error')
    }
})

app.get('/getAllTeachers',middleware,async(req,res)=>{
    try{
        const exist = await teachersmodel.find()
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getAllTeachers Server Error')
    }
})
/////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//          Alumini               //


//registration of alumini by admin
app.post('/aluminiregister',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,github,linkedin,skill,password,confirmpassword,pg,job,bio,project,currentcompany,experience,currentjoblocation,quote } = req.body;
        let exist = await aluminimodel.findOne({email});
        if(!exist){
            exist = await users.findOne({email})
        }
        if(exist){
            return res.status(200).send('user already registered with this mailId')
        }
        const existId = await aluminimodel.findOne({collegeId});
        if(existId){
            return res.status(200).send('this alumini collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new aluminimodel({
            fullname,collegeId,branch,email,mobile,github,linkedin,skill,password,confirmpassword,pg,job,bio,project,currentcompany,experience,currentjoblocation,quote
        })
        await newUser.save();

        let allprofiles7 = await aluminimodel.find();
        return res.status(200).json({message:'Alumini Registered Successfully', update : allprofiles7}) 
    }
    catch(err){
        console.log(err)
        return res.status(500).send('aluminiregister Server Error')
    }
})


// get all alumini info for alumini page
app.get('/allaluminis',middleware,async (req,res) =>{
    try{
        let allprofiles = await aluminimodel.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('allaluminis Server Error')
    }
})


// get selected alumini info for alumini page
app.get('/indprofilee2/:id',middleware, async (req,res)=>{
    try{
        let indprofile = await aluminimodel.findById(req.params.id);
        return res.json(indprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('indprofilee2 Server Error')
    }
})


// update github of alumini
app.put('/addgithubA/:id',middleware,async (req,res) =>{
    try{
        const {github} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            github : github || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'Github updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addgithubA Server Error')
    }
})

// update linkedin of alumini
app.put('/addlinkedinA/:id',middleware,async (req,res) =>{
    try{
        const {linkedin} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            linkedin : linkedin || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'linkedin updated successfully',update:myprofile})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addlinkedinA Server Error')
    }
})

// update post graduation of alumini
app.put('/addpgA/:id',middleware,async (req,res) =>{
    try{
        const {pg} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            pg : pg || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'Post Graduation updated successfully',update:myprofile})
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addpgA Server Error')
    }
})

// update bio of alumini
app.put('/addbioA/:id',middleware,async (req,res) =>{
    try{
        const {bio} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            bio : bio || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'bio updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addbioA Server Error')
    }
})

// update project of alumini
app.put('/addprojectA/:id',middleware,async (req,res) =>{
    try{
        const {project} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            project : project || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'Project updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addprojectA Server Error')
    }
})

// update experience of alumini
app.put('/addexpA/:id',middleware,async (req,res) =>{
    try{
        const {experience} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            experience : experience || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'experience updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addexperienceA Server Error')
    }
})

// update skill of alumini
app.put('/addskillA/:id',middleware,async (req,res) =>{
    try{
        const {skill} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            skill : skill || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'skills updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addexperienceA Server Error')
    }
})

// update mobile of alumini
app.put('/addmobileA/:id',middleware,async (req,res) =>{
    try{
        const {mobile} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            mobile : mobile || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'mobile number updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);

        return res.status(500).send('addmobileA Server Error')
    }
})

// update quote of alumini
app.put('/addquoteA/:id',middleware,async (req,res) =>{
    try{
        const {quote} = req.body; 
        
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            quote : quote || "-",
            
        })
        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'quote updated successfully',update:myprofile})
      
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addquoteA Server Error')
    }
})

// update job info of alumini
app.put('/addjobA/:id',middleware,async (req,res) =>{
    try{
        const {job,currentcompany,currentjoblocation} = req.body; 
        await aluminimodel.findByIdAndUpdate(req.params.id,{
            
            job : job || "-",
            currentcompany : currentcompany || "-",
            currentjoblocation : currentjoblocation || "-"
            
        })

        let myprofile = await aluminimodel.findById(req.user.id);
        return res.status(200).json({message:'job company location updated successfully',update:myprofile})
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addJCLA Server Error')
    }
})




// app.listen(PORT,()=> console.log('Server is Running..'))


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running");
    })
})