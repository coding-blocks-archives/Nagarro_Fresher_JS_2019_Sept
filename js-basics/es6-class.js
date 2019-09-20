class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

let p = new Person('Jane', 22)
let p1 = new Person('Shaun', 44)


class Student extends Person {
  constructor(name, age, grade) {
    super(name, age)
    this.grade = grade
  }
}

let s = new Student('Nancy', 15, 10)
