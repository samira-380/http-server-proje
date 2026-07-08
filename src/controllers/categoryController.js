const Category = require('../models/Category');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error('Kategori bulunamadı');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      const error = new Error('Kategori bulunamadı');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error('Kategori bulunamadı');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: 'Kategori silindi', deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };