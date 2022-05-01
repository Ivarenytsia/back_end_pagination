const { restart } = require('nodemon');
const Model = require('../models/Model')

exports.getAllPosts = async(req, res) =>{
    try{
        let query = Model.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;//default 10 results per page
        const skip = (page - 1) * pageSize;
        const total = await Model.countDocuments();

        const pages = Math.ceil(total/pageSize);
        
        query = query.skip(skip).limit(pageSize);

        if(page > pages){
            return res.status(404).json({
                status:'failed',
                message:'No Page Found!'
            });
        }

        const result = await query;
        //assume we are at page=2 with pageSize=50,
        //then skip=50 -->> so the db will be queried for 50 through 100 indexed entries.

        res.status(200).json({
            status:'success',
            count: result.length,
            page,
            pages,
            data: result
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status:'error',
            message:'Server Error'
        });
    }
};
