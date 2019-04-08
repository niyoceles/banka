export default class Homepage {
  static getHome(req, res) {
    return res.status(200).json({
      message: 'Welcome!!!',
    });
  }
}
