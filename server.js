var mongo = require('mongodb').MongoClient ;
var client = require('socket.io').listen(8080 , {origins: '*:*'}).sockets;

mongo.connect('mongodb://127.0.0.1/chat' , function(err , db){

    if(err) throw err ;

    client.on('connection' , function(socket){
        var col = db.collection('messages') ,
            sendStatus = function(s)
            {   
                socket.emit('status' , s) ;
            };


        //emit all messges when a client connects to it

        col.find().limit(100).sort({_id : 1}).toArray(function(err , res)
            {
                if(err) throw err ;
                socket.emit('output' , res) ;
            }) ;

        //wait for input

        socket.on('input' , function(data){
            var name = data.name ,
                message = data.message , 
                    whitespacePattern = /^\s*$/ ; 

            if(whitespacePattern.test(name) || whitespacePattern.test(message))
            {
                sendStatus('Name Or message is required') ;
            }
            else{
                col.insert({name : name , message:message} , function()
                {

                    //Emit latest message

                    client.emit('output' , [data]) ;

                    sendStatus({
                        message : "Message send" ,
                        clear : true 
                    }) ;
                });
            }
        })
    });
});