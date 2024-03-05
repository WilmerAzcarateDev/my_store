const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor(limit) {
    this.products = [];
    this._generate(limit);
  }

  find(limit) {
    let products = this.products.slice(0, limit);
    return products;
  }

  findOne(id) {
    let index = this._findIndex(id);
    return this.products[index];
  }

  create(data) {
    const product = {
      id: faker.string.uuid(),
      ...data
    };

    this.products.push(product);

    return product;
  }

  update(id, data) {
    let index = this._findIndex(id);
    this.products[index] = {
      id: (data.id !== undefined) ? data.id : this.products[index].id,
      name: (data.name !== undefined) ? data.name : this.products[index].name,
      price: (data.price !== undefined) ? data.price : this.products[index].price,
      image: (data.image !== undefined) ? data.image : this.products[index].image
    };
    return this.products.find(product => product.id === id);
  }

  delete(id) {
    let index = this._findIndex(id);
    this.products.splice(index, 1);
  }

  _generate(limit) {
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlLoremFlickr({ category: 'food' }),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  _findIndex(id) {
    let index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    return index;
  }

}

module.exports = ProductService