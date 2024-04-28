const Messages = require("../models/messageModel");
module.exports.getMessages = async (req, res, next)=>{
    try{
         const {from, to } = req.body;
        const messages = await Messages.find({
           // from: '660c5a5ea4c4ca7c20fbf2ee'
            users:{
                $all: [from, to], 
            },
        // Struggled a lot here...
        }).sort({updatedAt: 1});
        
        // console.log(messages.users);
        //  console.log(messages);
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            };
        });
        res.json(projectedMessages);
        //console.log(res);
        
    }catch(err){
        next(err);
    }
};

module.exports.addMessage = async (req, res, next)=>{
    try{
        const {from, to, message} = req.body;
        const data = await Messages.create({
            message: {text:message},
            users: [from, to],
            // initially u write users: {from, to}
            // this made users an object of two ids, you fucked up big time
            // the data schema that you are trying to fetch should be the same as the one you have created
            
            sender: from,
        });
      
        if(data) return res.json({msg:"Message added Successfully"});
        return res.json({Err: "Failed to add message to DB"});
    }catch(err){
        next(err);
    }
};

