const { response } = require("express");
const Course = require("./models/Course");

class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((courses) => {
        if (courses) {
          courses = courses.toObject();
          res.render("courses/show", { courses });
        }
      })
      .catch(next);
  }
  create(req, res, next) {
    res.render("courses/create");
  }
  store(req, res) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course.save().then(() => res.redirect("/"));
  }
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((courses) => {
        if (courses) {
          courses = courses.toObject();
          res.render("courses/edit", { courses });
        }
      })
      .catch(next);
  }
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
  handleFormActions(req, res, next) {
    Course.deleteMany({ _id: { $in: req.body.courseIds } })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
}

module.exports = new CourseController();
