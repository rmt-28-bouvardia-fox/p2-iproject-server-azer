const {Bean, Variety} = require('../models')

const showBeans = async (req,res,next) => {
    try {
        const getPagination = (page, size) => {
            const limit = size ? +size :1
            const offset = page ? page * limit : 0
            return {limit, offset}
        }

        let {page} = req.query
        const {limit, offset} = getPagination(page, 4)
        let data;
        if(page){
            data = await Bean.findAll({
                offset: offset,
                limit: limit,
                include: [Variety],
                order: [["id"]]
            })
        } else {
            data = await Bean.findAll({
                include: [Variety],
                order: [["id"]]
            })
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

const detailBean = async(req,res,next) => {
    try {
        const {id} = req.params
        let data = await Bean.findByPk(id, {
            include: [Variety]
        })
        if (!data){
            throw { name: 'Not Found'}
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

module.exports = BeansController