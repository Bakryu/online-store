const uuid = require("uuid");
const path = require("path");
const { Device } = require("../models/models");
const ApiError = require("../errors/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg"; //unique name generator
      img.mv(path.resolve(__dirname, "..", "static", fileName)); //create path to img

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        info,
        img: fileName,
      });

      return res.json(device);
    } catch (error) {
      ApiError.badRequest(error.message);
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  async getOne(req, res) {}
}

module.exports = new DeviceController();
