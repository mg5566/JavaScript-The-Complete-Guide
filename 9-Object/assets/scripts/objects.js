const userKeyName = 'level';

const person = {
  'first name': 'Kang',
  age: 30,
  [userKeyName]: 5,
  greet: () => {
    alert(`Hi, I am ${this.name}`);
  },
};

delete person.age;
console.log(person)