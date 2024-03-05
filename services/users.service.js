const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UserService {

  constructor(limit) {
    this.users = [];
    this._generate(limit);
  }

  find(limit) {
    let users = this.users.slice(0, limit);
    return users;
  }

  findOne(id) {
    let index = this._findIndex(id);
    return this.users[index];
  }

  create(data) {
    const user = {
      id: faker.string.uuid(),
      ...data
    };

    this.users.push(user);

    return user;
  }

  update(id, data) {
    let index = this._findIndex(id);
    this.users[index] = {
      id: (data.id !== undefined) ? data.id : this.users[index].id,
      name: (data.name !== undefined) ? data.name : this.users[index].name,
      price: (data.price !== undefined) ? data.price : this.users[index].price,
      image: (data.image !== undefined) ? data.image : this.users[index].image
    };
    return this.users.find(product => product.id === id);
  }

  delete(id) {
    let index = this._findIndex(id);
    this.users.splice(index, 1);
  }

  _generate(limit) {
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sex(),
        photo: faker.image.urlLoremFlickr({ category: 'people' })
      });
    }
  }

  _findIndex(id) {
    let index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    return index;
  }

}

module.exports = UserService