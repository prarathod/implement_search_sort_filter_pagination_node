const router = require("express").Router();
const Movie = require("../models/Movie");

router.get("/movies", async(req,res)=>{
    try{
        const page = parseInt(req.query.page) -1 || 0;

    }catch(err){
        console.log(err);
        res.status(500).json({error:true, massage:"Internal Server Error"});
    }
})

module.exports = router;