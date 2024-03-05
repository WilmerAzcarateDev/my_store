const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const {size:limit} = req.query;
  // const limit = size||10;

  let categories = [];

  for (let index = 0; index < limit; index++) {
    categories.push({
      id:faker.number.int(100),
      name:faker.commerce.department(),
      image:faker.image.urlLoremFlickr()
    });
  }
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  let categorie = {
    id,
    name:faker.commerce.department(),
    image:faker.image.urlLoremFlickr()
  }
  res.json(categorie)
});

router.post('/',(req,res)=>{
  const {body} = req;
  let id = faker.commerce.isbn();
  let data = {...body,id};
  res.json({
    message:'created',
    data:data
  });
});

router.put('/:id',(req,res)=>{
  const {id} = req.params;
  const {body} = req;
  let data = {...body,id};
  res.json({
    message:`${id} updated`,
    data: data
  });
});

router.patch('/:id',(req,res)=>{
  const {id} = req.params;
  const {body} = req;
  let data = {...body,id};
  res.json({
    message:`${id} partially updated`,
    data: data
  });
})

router.delete('/:id',(req,res)=>{
  const {id} = req.params;

  res.json({
    message:`${id} deleted`,
  });
})

module.exports = router;