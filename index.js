var express = require('express');
var mongodb = require('mongodb');
var moment = require('moment');
var crypto = require('crypto');
var app = express();

var uri = 'mongodb://sz2468110:sz135799@ds047802.mongolab.com:47802/shugraduationproject';
var database;


mongodb.MongoClient.connect(uri, function(err, db) {
	if (err) {
		console.log('connect mongo db error ' + err);
	} else {
		console.log('connect mongo db success');
		database = db;
	}
});

app.get('/api/createDataPoint', function(request, response) {
	// 使用者註冊
	if (!request.query.value) {
		__sendErrorResponse(response, 403, 'No query parameters value');
		return;
	}

	
	var straccount;
	var strname;
	var strpasswd;
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<3; a++)
	{
		if(a==0)
		{
			straccount = AccountArray[a];
		}
		else if (a == 1)
        {
        	text = AccountArray[a];
        	var hasher=crypto.createHash("md5");

            hasher.update(text);

            var hashmsg=hasher.digest('hex');//hashmsg为加密之后的数据
        	strpasswd = hashmsg ;
          

        }
		else if(a==2)
		{
            strname = AccountArray[a];
		}
	}

	var insert = {
		straccount : straccount,
		
		strpasswd : strpasswd,
		strname : strname

	};
var items = database.collection('beacon_history');
	items.find(straccount).toArray(function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		         }
		 else 
		 {
		 	if( result[]!==null)
		 	{
              console.log("帳號已註冊e");
			response.type('application/json');
			response.status(200).send(result);
			response.end();
		    }
		    else
		    {
               items.insert(insert, function(err, result) {
		       if (err) {
			      __sendErrorResponse(response, 406, err);
		                }
		     else     
		      {
			    response.type('application/json');
		     	response.status(200).send(result);
			    response.end();
		       }
	               });
		    }
		 }
	});

	
});
app.get('/api/login', function(request, response) {
	// 會員登入回傳密碼
	var straccount;
	var strname;
	var strpasswd;
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<2; a++)
	{
		if(a==0)
		{
			straccount = AccountArray[a];
		}
		else if (a == 1)
        {
        	
         strpasswd = AccountArray[a];

        }
		
	}

	
	var items = database.collection('beacon_history');
	items.find({straccount: straccount}, {"strpasswd": 1, "_id": 0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		         } 
		else 
		{
			
			response.type('application/json');
			response.status(200).send(docs).end();
		    
		}
	});
});
app.get('/api/addgroup', function(request, response) {
	// 群組加入(註冊))
	if (!request.query.value) {
		__sendErrorResponse(response, 403, 'No query parameters value');
		return;
	}

	
	var groupaccount ;
	var username ;
	var grouppasswd ;
	var straccount ;
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<4; a++)
	{
		if(a==0)
		{
			groupaccount = AccountArray[a];
		}
		else if (a == 1)
        {
        	text = AccountArray[a];
        	var hasher=crypto.createHash("md5");

            hasher.update(text);

            var hashmsg=hasher.digest('hex');//hashmsg为加密之后的数据
        	grouppasswd = hashmsg ;
        	
          

        }
		else if(a==2)
		{
            username = AccountArray[a];
		}
		else if (a==3)
		{
			straccount = AccountArray[a];
		}
	}

	var insert = {
		groupaccount : groupaccount,
		
		grouppasswd : grouppasswd,
		username : username

	};
	var name = {
		straccount : straccount,
		groupaccount : groupaccount

	};

var items2 = database.collection('name_history');
	items2.insert(name, function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send(result);
			response.end();
		}
	});

	var items = database.collection('group_history');
	items.insert(insert, function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send(result);
			response.end();
		}
	});
});

app.get('/api/queryDataPoint', function(request, response) {

	var items = database.collection('beacon_history');

	var limit = parseInt(request.query.limit, 10) || 100;

	items.find().sort({$natural: -1}).limit(limit).toArray(function (err, docs) {
		if (err) {
			console.log(err);
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send(docs);
			response.end();
		}
	});
});






app.get('/api/findgroup', function(request, response) {
	// 輸入會員帳號回傳擁有的群組
	var straccount;
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<1; a++)
	{
		if(a==0)
		{
			straccount = AccountArray[a];
		}
		
	}


	
	var items = database.collection('name_history');
	items.find({straccount : straccount}, {"groupaccount": 1, "_id": 0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});
app.get('/api/findusername', function(request, response) {
	// 輸入群組名字回傳會員名字
	var groupaccount;
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<1; a++)
	{
		if(a==0)
		{
			groupaccount = AccountArray[a];
		}
		
	}


	
	var items = database.collection('group_history');
	items.find({groupaccount: groupaccount}, {"username": 1, "_id": 0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});
app.get('/api/addusername', function(request, response) {
	// 加人到群組
	var groupaccount;
	var username;
	
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<2; a++)
	{
		if(a==0)
		{
			groupaccount = AccountArray[a];
		}
		
		if(a==1)
		{
			username= AccountArray[a];
		}
		
	}
	var insert = {
		groupaccount : groupaccount,
		username : username

	};



	var items = database.collection('group_history');
	items.insert(insert, function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send(result);
			response.end();
		}
	});
});
app.get('/api/leavemessage', function(request, response) {
	// 留下訊息
	var receiver;
	var message;
	var sender;
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<3; a++)
	{
		if(a==0)
		{
			receiver = AccountArray[a];
		}
		
		if(a==1)
		{
			message = AccountArray[a];
		}
		if(a==2)
		{
			sender = AccountArray[a];
		}
	}
	var message = {
		receiver : receiver ,
		message : message ,
		sender : sender

	};



	var items = database.collection('message_history');
	items.insert(message, function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send(result);
			response.end();
		}
	});
});
app.get('/api/checkmessage', function(request, response) {
	// 查看訊息
	var receiver;
	var message;
	var sender;
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<2; a++)
	{
		if(a==0)
		{
			receiver = AccountArray[a];
		}
		
		if(a==1)
		{
			sender = AccountArray[a];
		}
	}

	
	var items = database.collection('message_history');
	items.find({receiver : receiver , sender : sender}, {"message": 1, "_id": 0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});
app.get('/api/updatausername', function(request, response) {
	// 修改暱稱
	var old_username;
	var new_username;
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<2; a++)
	{
		if(a==0)
		{
			old_username = AccountArray[a];
		}
		if(a==1)
		{
            new_username = AccountArray[a];
		}
		
	}


	
	var items = database.collection('group_history');
	items.update({username : old_username}, {$set: {username: new_username}}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000));

function __sendErrorResponse(response, code, content) {
	var ret = {
		err: code,
		desc : content 
	};
	response.status(code).send(ret);
	response.end();
}