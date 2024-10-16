const {cosmicBooks}=require('../database/database');

const getCosmicBook=async(req,res)=>{
    try{
        const cosmicBook=await cosmicBooks.findAll();
        console.log(cosmicBook);
        res.status(200).json(cosmicBook);
    }
    catch(error){
        console.log("Error to fetch Books",error);
        res.status(500).json({error:"Failed to fetch Books details"});
    }
}

const postCosmicBook=async(req,res)=>{
    try{
        console.log('Recevied database:',req.body);
        const newCosmicBook=await cosmicBooks.create(req.body);
        res.status(201).json(newCosmicBook);
        console.log('New  books details created:', newCosmicBook);
    }
    catch(error){
        console.log('Error creating books Details',error);
        res.status(500).json({error:'Failed to create the item'});
    }
}




module.exports={
    getCosmicBook,
    postCosmicBook
}