const ApiError = require("../errors/ApiError");

class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Id не указан"));
    }
    res.json(id);
  }
}

module.exports = new UserController();
