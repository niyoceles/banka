export default class Homepage {
  static getHome(req, res, next) {
    return res.status(200).json({
      message: 'Welcome!!!',
    });
  }
}
