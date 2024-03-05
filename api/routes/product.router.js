const express = require('express');

const ProductService = require('../services/product.service');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
const { validatorHandler } = require('../middlewares/validator.handler');

const router = express.Router();

const service = new ProductService(1000);

router.get(
  '/',
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const limit = size || 10;
      let products = service.find(limit);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let product = service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      let newProduct = service.create(body);
      res.json({
        message: 'created',
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  });

router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const { body } = req;
      let updatedProduct = service.update(id, body);
      res.json({
        message: `${id} updated`,
        data: updatedProduct
      });
    } catch (error) {
      next(error);
    }
  });

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      let updatedProduct = service.update(id, body);
      res.json({
        message: `${id} partially updated`,
        data: updatedProduct
      });
    } catch (error) {
      next(error);
    }
  });

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json({
        message: `${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;