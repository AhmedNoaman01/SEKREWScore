const express=require('express');
const asynchandler=require('express-async-handler');
const Board=require('../models/Board');

//get all players
exports.GetAllplayers=asynchandler(async(req,res)=>{
        const Players=await Board.find().sort("-score");
        if(!Players){
            res.status(404).json({message:'No Players found please add some Players'});
        }
        res.render('index',{Players});
        // res.status(200).json({Players});
    }
);

//get player by id
exports.GetOneplayers=asynchandler(async(req,res)=>{
        const id=req.params.id;
        const Players=await Board.findById(id);
        if(!Players){
            res.status(404).json({message:'No Players found with this id'});
        }
        res.status(200).json({Players});
    }
);

//create players
exports.createplayers=asynchandler(async(req,res)=>{
        const Players=await Board.create(req.body);
        res.status(201).json({Players});
    }
);

//update score
exports.Updateplayers=asynchandler(async(req,res)=>{
        const {id}=req.params;
        const {score} = req.body;

        const player = await Board.findById(id);
        if (!player) {
            res.status(404).json({ message: 'No player found with this id' });
            return;
        }

        const newScore = player.score + score;
        const Players = await Board.findByIdAndUpdate(id, { score: newScore }, { new: true });
        if(!Players){
            res.status(404).json({message:'No player found with this id'});
        }
        res.status(200).json({Players}); 
      }
);
//delete Players
exports.Deleteplayers=asynchandler(async(req,res)=>{
    const id=req.params.id;
    const Players=await Board.findByIdAndDelete(id,{new:true});
    if(!Players){
        res.status(404).json({message:'No Players found with this id'});
    }
    res.status(200).json({message:"deleted succesfully",Players}); 
});

//reset scores
exports.Resetplayers =asynchandler(async (req, res) => {
    const updatedPlayers = await Board.updateMany({}, { score: 0 }); // Reset scores for all players

    if (updatedPlayers.matchedCount === 0) {
        return res.status(404).json({ message: "No Players found" });
    }

    res.status(200).json({ message: "Reset successfully", updatedPlayers });
});