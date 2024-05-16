const Service = require('../models/Service');
const ServicePriceOption = require('../models/ServicePriceOption');

exports.createService = async (req, res) => {
  const { categoryId } = req.params;
  const { name, type, priceOptions } = req.body;

  const service = await Service.create({ name, type, categoryId });
  
  for (const option of priceOptions) {
    await ServicePriceOption.create({ ...option, serviceId: service.id });
  }

  res.status(201).json(service);
};

exports.getServices = async (req, res) => {
  const { categoryId } = req.params;
  const services = await Service.findAll({ where: { categoryId } });
  res.json(services);
};

exports.updateService = async (req, res) => {
  const { categoryId, serviceId } = req.params;
  const { name, type, priceOptions } = req.body;

  await Service.update({ name, type }, { where: { id: serviceId, categoryId } });

  for (const option of priceOptions) {
    await ServicePriceOption.upsert({ ...option, serviceId });
  }

  res.json({ message: 'Service updated' });
};

exports.deleteService = async (req, res) => {
  const { categoryId, serviceId } = req.params;
  await Service.destroy({ where: { id: serviceId, categoryId } });
  res.json({ message: 'Service deleted' });
};
