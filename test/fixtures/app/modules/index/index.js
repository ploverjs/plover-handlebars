'use strict';


exports.view = function() {
  const data = {
    title: 'Hello Plover',
    desc: 'nodejs web framework.',
    fruits: ['Apples', 'Pears', 'Oranges']
  };

  this.render(data);
};


exports.books = function() {
  const books = [
    { name: 'CSS揭秘', price: 79.2 },
    { name: '深入理解机器学习：从原理到算法', price: 62.8 },
    { name: '高性能Javascript', price: 51.3 },
    { name: '奇点临近', price: 25 },
    { name: '代码大全', price: 105.8 }
  ];

  const special = {
    name: '模式分类',
    price: 50.2
  };

  const formatPrice = (v) => {
    return v + '元'
  };

  this.render({ books, special, formatPrice });
};
