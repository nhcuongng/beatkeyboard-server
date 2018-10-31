const UserModel = require('./model/UserModel');



module.exports = function(app){ 
    app.post('/post', (req,res) => {
        const {time,characters,id,date} = req.body;
        console.log(req.body);
        UserModel.findOneAndUpdate({id: id},{$push: 
            {history:{
                $each:[{time, characters,date}],
                $position: 0
            }}
        }, (err, userUpdated) => {
            if(err) res.status(500).json({success: 0, error: err});
            else res.json({success: 1, user: userUpdated});
        })
    })
    app.get('/show',(req,res) => {
        UserModel.find({}, (err,userFound) => {
            if(err) res.status(500).json({success: 0, error: err});
            else res.json({success: 1, user: userFound});
        })
    })


    app.delete('/delete',(req,res) => {
        const {id} = req.params;
        UserModel.findOne({id: "1885580631554517"}, (err,userFound) => {
            if(err) res.status(500).json({success: 0, error: err});
            else userFound.remove(function(){
                res.json({success: 1, user: userFound})
            })
        })
    })
}