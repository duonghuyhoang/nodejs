const Course = require("./models/Course");

class MeController {
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    courseQuery
      .exec()
      .then((courses) => {
        courses = courses.map((course) => course.toObject());
        res.render("me/stored-courses", {
          courses,
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
