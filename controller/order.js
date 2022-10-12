const { Order, OrderItem, Bean, Variety } = require("../models");
const midtransClient = require("midtrans-client");
const axios = require("axios");

const getOrderItem = async (req, res, next) => {
  try {
    let data = await OrderItem.findAll({
      where: {
        CustomerId: req.user.id,
        OrderId: null,
      },
      include: [Bean],
      order: ["id"],
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bean = await Bean.findByPk(id, {
      include: [Variety],
    });
    if (!bean) {
      throw { name: "Not Found" };
    }

    let getOrder = await Order.findAll({
      where: {
        CustomerId: req.user.id,
      },
    });
    let data = {};
    data = {
      ProductId: id,
      CustomerId: req.user.id,
      quantity: 1,
      priceSum: selectedPlan.price,
    };
    let newOrder = await OrderItem.create(data);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const delOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    let selectedBean = await Bean.findByPk(id, {
      include: [Variety],
    });
    if (!selectedBean) {
      throw { name: "Not Found" };
    }

    let customerId = req.user.id;

    let delOrder = await OrderItem.destroy({
      where: {
        CustomerId: customerId,
        id: targetedId,
      },
    });
    if (!delOrder) {
      throw { name: "Not Found" };
    }
    res.status(200).json(selectedBean);
  } catch (error) {
    next(error);
  }
};

const upOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    let selectedBean = await Bean.findByPk(id, {
      include: [Variety],
    });
    if (!selectedBean) {
      throw { name: "Not Found" };
    }
    let { quantity } = req.query;
    let customerId = req.user.id;

    let newprice = quantity * selectedBean.price;

    let input = {
      quantity: quantity,
      priceSum: newprice,
    };

    let data = await OrderItem.update(input, {
      where: {
        id: targetedId,
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const compileOrder = async (req, res, next) => {
  try {
    const CustomerId = req.params;
    let { total } = req.query;
    let invoice = await Order.create({
      customerId,
      total,
    });

    let items = await OrderItem.findAll({
      where: {
        CustomerId: req.user.id,
        OrderId: null,
      },
      include: [Bean],
      order: ["id"],
    });

    for (let i = 0; i < allItems.length; i++) {
      let input = {
        OrderId: invoice.id,
      };
      let { OrderId } = req.query;
      console.log({ OrderId }, 7);
      let inputOrderId = await OrderItem.update(input, {
        where: {
          id: allItems[i].id,
        },
      });
      console.log(inputOrderId);
    }
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

const showInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    let selectedOrder = await Order.findOne({
      where: {
        CustomerId: req.user.id,
        id: id,
      },
      include: [
        Customer,
        OrderItem,
        {
          model: Bean,
          through: "ProductId",
        },
      ],
    });
    res.status(200).json(selectedOrder);
  } catch (error) {
    next(error);
  }
};

const payments = async (req, res, next) => {
    try {
        let snap = new midtransClient.snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY
        })
        let {id} = req.params
        let selectOrder = await Order.findOne({
            where:{
                CustomerId:req.user.id,
                id:id
            },
            include:[Customer, OrderItem, {
                model: Bean, 
                through: 'ProductId'
            }]
        })
        let prefix = 113333555555
        let id = ( prefix + selectedOrder.id)
        res.status(200).json({})
    } catch (error) {
        next(error)
    }
}