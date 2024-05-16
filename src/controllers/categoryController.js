const Category = require('../models/Category');
const Service = require('../models/Service');

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  await Category.update({ name }, { where: { id: categoryId } });
  res.json({ message: 'Category updated' });
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const services = await Service.findAll({ where: { categoryId } });

  if (services.length === 0) {
    await Category.destroy({ where: { id: categoryId } });
    res.json({ message: 'Category deleted' });
  } else {
    res.status(400).json({ message: 'Category is not empty' });
  }
};
