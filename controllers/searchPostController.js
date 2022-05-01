const { restart } = require('nodemon');
const Model = require('../models/Model')

exports.findPosts = async(req, res) =>{
    try{
        const search = req.query.search

        if ( !(search)){
            return res.status(500).json({
                status:'failed',
                message:'No Search Parameter Given'
            });
        }

        let query = Model.find({"id":{'$regex': search, '$options' : 'i' }});

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;//default 10 results per page
        const skip = (page - 1) * pageSize;
        const total = await Model.countDocuments();

        const pages = Math.ceil(total/pageSize);

        query = query.skip(skip).limit(pageSize);

        if(page > pages){
            return res.status(404).json({
                status:'failed',
                message:'No Results Found!'
            });
        }

        const result = await query;
      
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