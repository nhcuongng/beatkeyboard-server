var url = require('../config/url');


const UserModel = require('./model/UserModel');



module.exports = function(app){ 
    app.post('/post', (req,res) => {
        const {time,characters,id,date} = req.body;
        
        UserModel.findOneAndUpdate({id: id},
            {$push: 
                {history:{
                    $each:[{time, characters,date}],
                    $position: 0
                }}
        } 
           
            , (err, userUpdated) => {
            if(err) res.status(500).json({success: 0, error: err});
            else res.json({success: 1, user: userUpdated});
        })
    })

    app.post('/challenge/post', (req, res) => {
        const {date, opponent, win, draw, id} = req.body;
        UserModel.findOneAndUpdate({id: id},
            {$push: 
                { challenge: {
                    $each:[{date,opponent,win,draw}],
                    $position: 0
                }
            }
        }
            , (err, userUpdated) => {
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

    app.delete('/delete/:id',(req,res) => {
        const {id} = req.params;
        UserModel.findOne({id}, (err,userFound) => {
            if(err) res.status(500).json({success: 0, error: err});
            else userFound.remove(function(){
                res.json({success: 1, user: userFound})
            })
        })
    })
}