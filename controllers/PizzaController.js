import PizzaSchema from "../models/Pizza.js";

export const getWithParams = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const category = req.query.category;
    let sortBy = req.query.sortBy;
    const order = req.query.order;
    const search = req.query.Search;
    let pizzas = await PizzaSchema.find();

    if (sortBy === 'title') {
      let c = a => 10 > a ? 2e4 + +a : a.charCodeAt(0);
      if (order === 'asc') {
        pizzas.sort((a, b) => c(b['title']) - c(a['title']));
      } else {
        pizzas.sort((a, b) => c(a['title']) - c(b['title']));
      }
    } else {
      if (!sortBy) {
        sortBy = 'rating';
      }
      if (order === 'asc') {
        pizzas.sort((a, b) => +(a[sortBy]) - (b[sortBy]));
      } else {
        pizzas.sort((a, b) => +(b[sortBy]) - (a[sortBy]));
      }
    }
    if (category) {
      pizzas = pizzas.filter(item => item['category'] === +category);
    }
    if (search) {
      pizzas = pizzas.filter(item => item['title'].toLowerCase().includes(search.toLowerCase()));
    }
    let length = pizzas.length
    if (pizzas.length > limit) {
      pizzas = pizzas.slice(+limit * (+page - 1), +limit * +page);
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Pages', Math.ceil(length / limit));
    res.json(pizzas);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить пиццы",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const pizzaId = req.params.id;
    PizzaSchema.findOne(
      {
        id: pizzaId,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Не удалось получить пиццу",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Пицца не найдена",
          });
        }
        res.json(doc);
      },
    )
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет связи с хранилищем пицц",
    });
  }
};
