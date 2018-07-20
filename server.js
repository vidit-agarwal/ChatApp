var mongo = require('mongodb').MongoClient ;
var client = require('socket.io').listen(8080 , {origins: '*:*'}).sockets;

mongo.connect('mongodb://127.0.0.1/chat' , function(err , db){

    if(err) throw err ;

    client.on('connection' , function(socket){
<<<<<<< HEAD
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
=======
        var col = db.collection('messages') ;
>>>>>>> f3dcf78e64d8d6ba03d7771b5b32c8f7c807fd5d

        //wait for input

        socket.on('input' , function(data){
            var name = data.name ,
                message = data.message , 
<<<<<<< HEAD
                    whitespacePattern = /^\s*$/ ; 

            if(whitespacePattern.test(name) || whitespacePattern.test(message))
            {
                sendStatus('Name Or message is required') ;
=======
                    whitespacePattern = /^\s*$/ ;

            if(whitespacePattern.test(name) || whitespacePattern.test(message))
            {
                console.log('Invalid') ;
>>>>>>> f3dcf78e64d8d6ba03d7771b5b32c8f7c807fd5d
            }
            else{
                col.insert({name : name , message:message} , function()
                {
<<<<<<< HEAD

                    //Emit latest message

                    client.emit('output' , [data]) ;

                    sendStatus({
                        message : "Message send" ,
                        clear : true 
                    }) ;
=======
                    console.log('INserted') ;
>>>>>>> f3dcf78e64d8d6ba03d7771b5b32c8f7c807fd5d
                });
            }
        })
    });
});