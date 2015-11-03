var express = require('express');
var mongodb = require('mongodb');
var moment = require('moment');
var crypto = require('crypto');
var gcm = require('node-gcm');
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
	var regid ;
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<4; a++)
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
		else if(a==3)
		{
            regid = AccountArray[a];
		}
	}

	var insert = {
		straccount : straccount,
		
		strpasswd : strpasswd,
		strname : strname,
		regid : regid

	};
var items = database.collection('beacon_history');
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
app.get('/api/checkstraccount', function(request, response) {
	// 檢查帳號
	var straccount;
	var strname;
	var strpasswd;
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

	
	
	var items = database.collection('beacon_history');
	items.find().toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		         } 
		else 
			var docs2 = new Array();
		    docs2 = docs ;


		{
			
			response.type('application/json');
			response.status(200).send(docs2[0]).end();
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
app.get('/api/logingroup', function(request, response) {
	// 群組登入回傳密碼
	var groupaccount;
	var strname;
	var grouppasswd;
		var grouppasswd;vv
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
		else if (a == 1)
        {
        	
         grouppasswd = AccountArray[a];

        }
		
	}

	
	var items = database.collection('group_history');
	items.find({groupaccount:groupaccount}, {"grouppasswd": 1, "_id": 0}).toArray(function(err, docs) {
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
	// 群組加入(註冊))))
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
		username : username,
		straccount : straccount

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
app.get('/api/findgroupaccount', function(request, response) {
	// 輸入beaconnumber回傳會員帳號
	var beaconnumber;
	
	var endString
	var str = request.query.value;
	var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<1; a++)
	{
		if(a==0)
		{
			beaconnumber = AccountArray[a];
		}
		
	}


	
	var items = database.collection('beacon_number');
	items.find({beaconnumber : beaconnumber}, {"groupaccount": 1, "_id": 0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});

app.get('/api/insertRegId', function(request, response) {  //儲存regid
	
var items = database.collection('group_history');

	var str = request.query.value;
	var Ary = new Array();
	var Ary= str.split(",");

	var account = Ary[0];
	var regid = Ary[1];
	items.find({straccount : account}, {"straccount": 1, "_id": 0}).toArray(function (err, docs) {
		if (err) {
			console.log(err);
			__sendErrorResponse(response, 406, err);
		} else {
			items.update( { straccount:account}, { '$set': { regid:regid } });
			response.type('application/json');
			var re = "Succeed Save : " + account + " : " + regid;
			response.status(200).send(re); 
			response.end();
		}
	});
	

});

var msg;
var allmsg = new Array();
var sendmsg;
var RegId;

app.get('/api/sendGCM', function(request, response) {
	// GCM  推播訊息
	var groupaccount;
	var message;
	var endString;
	var str = request.query.value;  
	RegId = "";

	/*var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<1; a++)
	{
		if(a==0)
		{
			groupaccount = AccountArray[a];
		}
	}*/
	groupaccount = str;
	var items = database.collection('group_history');
	items.find({groupaccount : groupaccount}, {"regid": 1, "_id": 0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {

			var jsArray = new Array();
            var jsArray = docs;
            for(var i = 0; i < jsArray.length; i++){
                var jsObj = Object();
                var jsObj = jsArray[i];
                if(jsObj.regid!=null && jsObj.regid != " " && jsObj.regid !=""){
					RegId += jsObj.regid + ",";
					console.log('regid : ' +  jsObj.regid); 
                }
                    
                
            }
            var items2 = database.collection('message_history');
	items2.find({groupaccount: groupaccount},{"message": 1,"_id":0}).toArray(function(err2, docs2) {
		if (err2) {
			response.status(406).send(err2).end();
		} else {
			msg = "";
           var jsArray2 = new Array();
            var jsArray2 = docs2;
            for(var i = 0; i < jsArray2.length; i++){
                var jsObj = Object();
                var jsObj = jsArray2[i];
                if(jsObj.message!=null && jsObj.message != " " && jsObj.message !=""){
					msg += jsObj.message + ",";
					console.log('message : ' +  jsObj.message); 
                }
                    
            }
            
    		var allmsg = msg.split(",");
			sendmsg = "你現在有" + (allmsg.length-1).toString() + "筆"+groupaccount+"的訊息";
           
            getGCM();
			response.type('application/json');
			response.status(200).send(RegId + " : " + msg).end();
		
	}
	}); 
		}
	});
});

function getGCM() {
    var gcm4node = require('gcm4node');

    // only auth is REQUIRED
    var config = {
        auth: 'AIzaSyCkrINxWlkkm9dh241V7XB7e8ShX6ZjG90',
        dryRun: false,
        group_size: 1000,
        verbose: false
    };
    var gcm = gcm4node.gcm4node(config);

    gcm.on('removed', function (removed) {
        console.log('removed devices: ' + removed.length);
    });
    gcm.on('updated', function (updated) {
        console.log('updated devices: ' + updated.length);
    });
    gcm.on('invalid', function (invalid) {
        console.log('invalid devices: ' + invalid.length);
    });

    
    
    // only the collapseKey option is REQUIRED
    	var options = {
        collapseKey: 'msg',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            msg:sendmsg
        }
    };
    var clients = new Array();
    var clients = RegId.split(",");
    gcm.send(clients, options, function(err, removed, updated, invalid) {
        if (err)
            console.log('ops: ' + err);
        else
            console.log('removed: ' + removed.length +
                ', updated: ' + updated.length +
                ', invalid: ' + invalid.length);
    });

    
}

app.get('/api/findmessage', function(request, response) {
	// 輸入群組名字回傳代辦事項
	var groupaccount;
	var message ;
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


	
	var items = database.collection('message_history');
	items.find({groupaccount: groupaccount}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
})
app.get('/api/beaconnumber2', function(request, response) {
	// 輸入beaconid回傳代辦事項
	var groupaccount;
	var message ;
	var endString
	var str = request.query.value;
	groupaccount = "" ;
	/*var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<1; a++)
	{
		if(a==0)
		{
			groupaccount = AccountArray[a];
		}
		
	}
*/
beaconnumber = str ;

	
	var items = database.collection('beacon_number');

	items.find({beaconnumber:beaconnumber}, {"groupaccount": 1,"_id":0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			  var jsArray2 = new Array();
            var jsArray2 = docs;
            for(var i = 0; i < jsArray2.length; i++){
                var jsObj = Object();
                var jsObj = jsArray2[i];}
		groupaccount = jsObj ;
		}
	});
	var items2 = database.collection('message_history');
	items2.find({groupaccount:groupaccount}, {"message": 1,"_id":0}).toArray(function(err2, docs2) {
		if (err2) {
			response.status(406).send(err2).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs2).end();
		}
	});
})
app.get('/api/beaconnumber', function(request, response) {
	// 輸入beacon編號回傳群組代辦事項
	var beaconnumber;
	var groupaccount ;
	var message ;
	var endString
	var str = request.query.value;
	/*var AccountArray = new Array();
	var AccountArray = str.split(",");
	for(a=0; a<1; a++)
	{
		if(a==0)
		{
			beaconnumber = AccountArray[a];
		}
		
	}
*/
   beaconnumber = str;

	
	var items = database.collection('beacon_number');
	var items2 = database.collection('message_history');
	items.find({beaconnumber:beaconnumber}, {"groupaccount": 1,"_id":0}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			//console.log('result ' + JSON.stringify(docs));
			  var jsArray2 = new Array();
            var jsArray2 = docs;
            for(var i = 0; i < jsArray2.length; i++){
                var jsObj = Object();
                var jsObj = jsArray2[i];}
			groupaccount = jsObj ;
			
			items2.find({groupaccount:groupaccount}).toArray(function(err2, docs2) {
				if (err2) {
					response.status(406).send(err2).end();
				} else {

					console.log('result2 ' + JSON.stringify(docs2));
					response.type('application/json');
					response.status(200).send(docs2).end();
				}
			});
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
app.get('/api/createmessage', function(request, response) {
	// 新增訊息
	var groupaccount;
	var message;
	
	
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
			message = AccountArray[a];
		}
		
	}
	var message2 = {
		groupaccount : groupaccount,
		message : message 
		

	};



	var items = database.collection('message_history');
	items.insert(message2, function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send("新建成功");
			response.end();
		}
	});
});app.get('/api/removemessage', function(request, response) {
	// 刪除訊息
	var groupaccount;
	var message;
	
	
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
			message = AccountArray[a];
		}
		
	}
	
var message = {
		groupaccount : groupaccount,
		message : message 
		

	};


	var items = database.collection('message_history');
	items.remove(message, function(err, result) {
		if (err) {
			__sendErrorResponse(response, 406, err);
		} else {
			response.type('application/json');
			response.status(200).send("成功刪除");
			response.end();
		}
	});
});
app.get('/api/checkmessage', function(request, response) {
	// 查看訊息
	var groupaccount;
	var message;
	var sender;
	
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

	
	var items = database.collection('message_history');
	items.find({groupaccount:groupaccount}, {"message": 1, "_id": 0}).toArray(function(err, docs) {
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