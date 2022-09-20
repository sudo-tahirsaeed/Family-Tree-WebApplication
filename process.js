//MONGO DB AUTH 

const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='datacenter'
const client= new MongoClient(url);
var lemail="";
var lpass="";
var x=0,msu=0,check=0,idv,ex=0;
var tabledata = [];
async function getData()
{
	
    let result = await client.connect();
    db= result.db(databaseName);
    collection = db.collection('login');

	
	var query = { email: lemail };
	db.collection("login").find(query).toArray(function(err, resultx) {
		if (err) throw err;
		if(resultx.length===0){
			x=0;
		}
		else{
		if(resultx[0].password===lpass)
		{
			//console.log("Auth Sucess Mongo ");
			x=1;


			db.collection("family").find({email: lemail}).toArray(function(errr, resultxx) {
				if(resultxx.length===0){
					tabledata=[];
				}
				else
				{
				
					var a=0;
					var i=0;
					while(a<resultxx.length)
					{
					tabledata[i]=resultxx[a].id;
					tabledata[i+1]=resultxx[a].name;
					tabledata[i+2]=resultxx[a].pid;
					tabledata[i+3]=resultxx[a].sid;
					tabledata[i+4]=resultxx[a].desc;
					
					i=i+5;
					a=a+1;
					}
				}

			});

		}
		

		else{
			console.log("No record in Mongo");
			x=0;
			
		}
	}
		
	  });
	  
}
async function searchm(e)
{ let result = await client.connect();
    db= result.db('datacenter');
    collection = db.collection('family');
  
	db.collection("family").find({email: e}).toArray(function(errr, resultxx) {
		if(resultxx.length===0){
			tabledata=[];
		}
		else
		{
			tabledata=[];
		
			var a=0;
			var i=0;
			while(a<resultxx.length)
			{
			tabledata[i]=resultxx[a].id;
			tabledata[i+1]=resultxx[a].name;
			tabledata[i+2]=resultxx[a].pid;
			tabledata[i+3]=resultxx[a].sid;
			tabledata[i+4]=resultxx[a].desc;
			
			i=i+5;
			a=a+1;
			}
		}

	});

}


async function storeData(ns,es,ps,is)
{
	
    let result = await client.connect();
    db= result.db(databaseName);
    collection = db.collection('login');
  
	var query = { email: es };
	db.collection("login").find(query).toArray(function(err, resultx) {
		if (err) throw err;
		if(resultx.length===0)
		{
			db.collection("login").insertOne({name: ns,email: es,password: ps,fid: is});
			msu=1;
		}
		else
		{
			
			
			  console.log("USER ALREADY EXIST");
		}
		
	  });
}
async function already(mail,id)

{
    let result = await client.connect();
    db= result.db('datacenter');
    collection = db.collection('family');
  
	var query = { 'email': mail,'id':id  };
	db.collection("family").find(query).toArray(function(err, resultx) {
		if (err) throw err;
		// if id doesnt exist 
		if(resultx.length===0)
		{
		idv=0;
		}
		else
		{
			idv=1;
		}
	}
)}


async function deleted(mail,id)

{
	
    let result = await client.connect();
    db= result.db('datacenter');
    collection = db.collection('family');
  
	var query = { 'email': mail,'id':id  };
	db.collection("family").deleteOne(query);
	// console.log("data deleted");

	var ax=0;
	var ix=0;
	//console.log(tabledata.length);
	while(ax<tabledata.length)
	{
if(tabledata[ax]===id)
{
	tabledata.splice(ax, 5); 
	// console.log("REMOvED");
break;
}
ax=ax+1;

	}
	
// 	client.close();
	
// const {MongoClient} = require('mongodb')
// const urlx= 'mongodb://localhost:27017';
// const databaseName='datacenter'
// const clientx= new MongoClient(urlx);

	


	


	
	
	}

async function storefamily(mail,name,oid,id,pid,sid,desc,c)

{
    let result = await client.connect();
    db= result.db('datacenter');
    collection = db.collection('family');
  
	var query = { 'email': mail,'id':oid  };
	db.collection("family").find(query).toArray(function(err, resultx) {
		if (err) throw err;
		// if id doesnt exist 
		if(resultx.length===0)
		{
			db.collection('family').insertOne({
				'email': mail,
				'id':id,
				"name": name,
				"pid":pid,
				"sid":sid,
				"desc":desc
				
			});

			//console.log("DOCUMENT ADDED");

			db.collection("family").find({email: mail}).toArray(function(errr, resultxx) {
				if(resultxx.length===0){
					
				}
				else{
				
					var a=0;
					var i=0;
					while(a<resultxx.length)
					{
					tabledata[i]=resultxx[a].id;
					tabledata[i+1]=resultxx[a].name;
					tabledata[i+2]=resultxx[a].pid;
					tabledata[i+3]=resultxx[a].sid;
					tabledata[i+4]=resultxx[a].desc;
					
					i=i+5;
					a=a+1;
					}
				}




			});
		}

		else
		{
		

			
			if(c===1 )
			{

			var newvalues = { $set: {
				'email': mail,
				'id':oid,
				"name": name,
				"pid":pid,
				"sid":sid,
				"desc":desc
			}
			};


			db.collection("family").updateOne({ 'email': mail,'id':oid  }, newvalues, function(err, res) {
				if (err) throw err;
				//console.log("1 document updated");
				
			  });
			
			
			  db.collection("family").find({email: mail}).toArray(function(errr, resultxx) {
				if(resultxx.length===0){
					
				}
				else{
				
					var a=0;
					var i=0;
					while(a<resultxx.length)
					{
					tabledata[i]=resultxx[a].id;
					tabledata[i+1]=resultxx[a].name;
					tabledata[i+2]=resultxx[a].pid;
					tabledata[i+3]=resultxx[a].sid;
					tabledata[i+4]=resultxx[a].desc;
					
					i=i+5;
					a=a+1;
					}
				}




			});
		





			}
			
			
			  
		}
		
	  });
}


const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('public'));


app.use('/css', express.static(__dirname + 'public'))
app.use(express.urlencoded());
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.set('views', './views');
app.set('view engine', 'ejs');




app.get('/serve', (req, res) => {
	searchm(req.body.emailsearch)
console.log(tabledata);
	// delay(1500).then(() => {
		
	
	// 	app.get('/table',(req,res)=>{

			
	// 		var re = tabledata.reduce((acc,item,index) => {
	// 			acc[`${index}`] = item;
	// 			return acc;
	// 		  }, {});
			   
	// 		 // console.log(res);
						
	// 					 res.status(200).json(re)
	// 		})
		
	
	// })



});
app.get('', (req, res) => {
	res.render('fam', { text: 'Hey' })

})




const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));



app.post('/sx',(req,res)=>{

	
	searchm(req.body.emailsearch)

	delay(1500).then(() => {
		
	
		app.get('/table',(req,res)=>{

			
			var re = tabledata.reduce((acc,item,index) => {
				acc[`${index}`] = item;
				return acc;
			  }, {});
			   
			 // console.log(res);
						
						 res.status(200).json(re)
			})
		
	
	})



})
app.post('/find',(req,res)=>{

			
	res.render('find', { text: 'Hey' })
})


app.post('/xas',(req,res)=>{

			
	deleted(lemail,req.body.t);



// 	const {MongoClient} = require('mongodb')
// const url= 'mongodb://localhost:27017';
// const databaseName='datacenter'
// const client= new MongoClient(url);

	delay(1500).then(() => {
		
	
		app.get('/table',(req,res)=>{

			
			var re = tabledata.reduce((acc,item,index) => {
				acc[`${index}`] = item;
				return acc;
			  }, {});
			   
			 // console.log(res);
						
						 res.status(200).json(re)
			})
		
	
	})


})

const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "public/temp"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

function getAge(dateString,dod) {
	
	
}
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}
app.post("/submit",
  upload.single("pic" /* name attribute of <file> element in your form */),
  (req, res) => {

	
	
	
	
		already(req.body.emailf,req.body.id);
	
	

	

	
	if(req.body.id==="")
	{
		res.send('<script>alert("ID CANT BE NULL");history.back(); </script>');
	}
	
	else
	{
		if(true)
		{
//mmddyy
//1BD 2DD


			var str=req.body.birthday;
			str=str.replace("-","");
			str=str.replace("-","/");
			var by= str.substring(0,4);
			str=str.slice(4);
			str=str+"/"+by;
			
			var str1=req.body.death;
			str1=str1.replace("-","");
			str1=str1.replace("-","/");
			var by1= str1.substring(0,4);
			str1=str1.slice(4);
			str1=str1+"/"+by1;
			

// console.log(str);

// console.log(str1);

			var c=(datediff(parseDate(str), parseDate(str1)));
			console.log(c);

			if(c<0)
			{
				
				check=1;
				res.send('<script>alert("Please Choose Valid Dates!!");history.back(); </script>');

			}


		}
		if(check!=1)
		{
			console.log("WORKED");
		check=0;
		var ai=0,ap=0;
		delay(1000).then(() => {	

		if(idv===0 && req.body.editx==='')
		{
			//console.log("EDIT 0");
			idv=0;
		
		
		var id=req.body.id;
		var pic=0,t2=0;
 try {
	const tempPath = req.file.path;

	const targetPath = path.join(__dirname, "public/familypics/"+id+".png");

 if (path.extname(req.file.originalname).toLowerCase() === ".png" )
  {
	t2=1;
   fs.rename(tempPath, targetPath, err => {
	 if (err) return handleError(err, res);

	 
   });
 }
  else {
   fs.unlink(tempPath, err => {
	 if (err) return handleError(err, res);

	res.send('<script>alert("ONLY .PNG PICS ALLOWED");history.back(); </script>');

   });
 }

 } catch (error) {
	
	//console.log("ERROR");
 }
 	if (true)
{
	console.log("add done");
	
	var brx=' ';

	if(req.body.descx!=null)
	{
		brx=req.body.descx;
	}
	req.body.name=req.body.title+" "+req.body.name;
	storefamily(req.body.emailf,req.body.name,req.body.id,req.body.id,req.body.pid,req.body.sid,brx+"\n DOB: "+req.body.birthday+"\n DOD: "+req.body.death+" \n Events: "+req.body.events,0);
t2=0;
}
	
	delay(1500).then(() => {	
	app.get('/table',(req,resx)=>{

			
		var re = tabledata.reduce((acc,item,index) => {
			acc[`${index}`] = item;
			return acc;
		  }, {});
		   
		 // console.log(res);
					
					 resx.status(200).json(re)
		})
	})
    

	
 
}

else
{
	var t1=0;
	if(req.body.editx!='')
	{
		
		
		try {
			const tempPath = req.file.path;
		
			const targetPath = path.join(__dirname, "public/familypics/"+req.body.editx+".png");
		
		 if (path.extname(req.file.originalname).toLowerCase() === ".png" )
		  {
			t1=1;
		   fs.rename(tempPath, targetPath, err => {
			 if (err) return handleError(err, res);
		
			 
		   });
		 }
		  else {
		   fs.unlink(tempPath, err => {
			t1=1;
			 if (err) return handleError(err, res);
			 res.send('<script>alert("ONLY .PNG PICS ALLOWED");history.back(); </script>');
			
			 
			 
		   });
		 }
		
		 
		
		 } catch (error) {
			
			//console.log("ERROR");
			t1=1;
		 }
		 if(true)
		 {
			var br=' ';
			console.log("DONE UPDATE");
			if(req.body.descx!=null)
			{
				br=req.body.descx;
			}
			req.body.name=req.body.title+" "+req.body.name;
		 storefamily(req.body.emailf,req.body.name,req.body.editx,req.body.id,req.body.pid,req.body.sid,br+"\n DOB: "+req.body.birthday+"\n DOD: "+req.body.death+" \n Events: "+req.body.events,1);
		 }
		t1=0;
		delay(1500).then(() => {	



	app.get('/table',(req,resxx)=>{

			
		var re = tabledata.reduce((acc,item,index) => {
			acc[`${index}`] = item;
			return acc;
		  }, {});
		   
		 // console.log(res);
					
					 resxx.status(200).json(re)
		})
	})

	}
	else
	{

	
	console.log("ID ALREADY");
	}
}

})




	}
	
	}
	check=0;
	}
	


	// res.send('<script>alert("Only PNG Allowed");history.back(); </script>');
		

	// 	if(ai===1)
	// 	{		res.send('<script>alert("ID ALREADY EXIST");history.back(); </script>');
	
	// ai=0;
	// }






);









app.post('/submitz', (req, res) => {
	
	
	// storefamily(req.body.emailf,req.body.name,req.body.id,req.body.pid,req.body.sid,req.body.desc);
	// delay(1500).then(() => {	
	// app.get('/table',(req,res)=>{

			
	// 	var re = tabledata.reduce((acc,item,index) => {
	// 		acc[`${index}`] = item;
	// 		return acc;
	// 	  }, {});
		   
	// 	 // console.log(res);
					
	// 				 res.status(200).json(re)
	// 	})
	// })
})
app.post('/su', (req, res) => {
	//   //res.send(`Full name is:${req.body.fname} ,Last name : ${req.body.fname}.`);

	
	storeData(req.body.names,req.body.emails,req.body.passwords,req.body.idnos);
	delay(1500).then(() => {	
if(msu===1)
{
	fs.appendFile('auth.txt', req.body.names+"\n"+req.body.emails+"\n"+req.body.passwords+"\n"+req.body.idnos+"\nxx\n", function (err) {
		
		if (err) throw err;
		console.log('Registeration Sucessfull!');
	});
	msu=0;
		res.render('regsucess', { text: 'Hey' })
}
else
{
	res.render('already', { text: 'Hey' })
}
	})
	
	

})

var f=0,got=0,auth=0;
var data = [];

var id='';


			
app.post('/log', (req, res) => {
	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('auth.txt')
	  });

	  	lemail=req.body.emaill;
		lpass=req.body.passwordl;
		getData();
		
		
	  lineReader.on('line', function (line) {
		
		

		if(line===req.body.emaill)
		{
		
			got=f;

		}
		
		data.push(line);
		f=f+1;

	  })
	 
	  
	  var iterator = data.values();
	  
	

	
	 delay(1000).then(() => {

		if(false){
			res.render('loginfailed', { email: data[got] });
			}
				
				else{
	// console.log("Email IS: "+data[got]+"\nPASSWORD IS: "+data[got+1]+"\nName IS: "+data[got-1]+"\nID IS: "+data[got+2]);
	if(x===1)
	{
		
		id=data[got+2];
		
		auth=1;
		// x=0;
		// while(x<10)
		// {
		// console.log(tabledata[x]);
		// x=x+1;
		// }
		x=0;
		res.render('dashboard', { email: data[got] });
		
		auth=0;		
	}
	else{
	
		console.log("AUTH FAILED!");
	
		res.render('loginfailed', { name: 'failed' });
		// res.json({ name: "example" });
		//res.render('fam', { name: 'failed' })
		
	}
}

found=0;
	
	})
});
app.get('/ix',(req,res)=>{
	res.status(200).json({
							'id': lemail
						})
		})

		
		app.get('/table',(req,res)=>{

			
var re = tabledata.reduce((acc,item,index) => {
	acc[`${index}`] = item;
	return acc;
  }, {});
   

			
			 res.status(200).json(re)

})



			
	
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
  }


app.listen(port, () => console.info(`App listening on port ${port}`));

