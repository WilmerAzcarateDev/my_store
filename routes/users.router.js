const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const {size} = req.query;
  const limit = size||10;

  let users = [];

  for (let index = 0; index < limit; index++) {
    users.push({
      id:faker.number.int(100),
      name:faker.person.firstName(),
      lastName:faker.person.lastName(),
      sex:faker.person.sex(),
      photo:faker.image.urlLoremFlickr({ category: 'people' })
    });
  }
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if(parseInt(id) == 999){
    res
      .status(404)
      .json({
        message:'Usuario no encontrado'
      });
      return;
  }
  let user = {
    id,
    name:faker.person.firstName(),
    lastName:faker.person.lastName(),
    sex:faker.person.sex(),
    photo:faker.image.urlLoremFlickr({ category: 'people' })
  }
  res.json(user)
});

router.post('/',(req,res)=>{
  const {body} = req;
  let id =faker.number.int(100);
  let data = {...body,id};
  res.status(201).json({
    message:'created',
    data:data
  });
});

router.put('/:id',(req,res)=>{
  const {id} = req.params;
  const {body} = req;
  if(parseInt(id) == 999){
    res
      .status(404)
      .json({
        message:'Usuario no encontrado'
      });
      return;
  }
  let data = {...body,id};
  res.json({
    message:`${id} updated`,
    data: data
  });
});

router.patch('/:id',(req,res)=>{
  const {id} = req.params;
  const {body} = req;
  if(parseInt(id) == 999){
    res
      .status(404)
      .json({
        message:'Usuario no encontrado'
      });
      return;
  }
  let data = {...body,id};
  res.json({
    message:`${id} partially updated`,
    data: data
  });
})

router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  if(parseInt(id) == 999){
    res
      .status(404)
      .json({
        message:'Usuario no encontrado'
      });
      return;
  }
  res.json({
    message:`${id} deleted`,
  });
})

module.exports = router;