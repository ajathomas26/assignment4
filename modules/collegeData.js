const fs = require("fs");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
      if (err) {
        reject("unable to load courses");
        return;
      }

      fs.readFile("./data/students.json", "utf8", (err, studentData) => {
        if (err) {
          reject("unable to load students");
          return;
        }

        dataCollection = new Data(
          JSON.parse(studentData),
          JSON.parse(courseData)
        );
        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(dataCollection.students);
  });
}

function getTAs() {
  return new Promise(function (resolve, reject) {
    var filteredStudents = [];

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].TA == true) {
        filteredStudents.push(dataCollection.students[i]);
      }
    }

    if (filteredStudents.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(filteredStudents);
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection.courses.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(dataCollection.courses);
  });
}

function getStudentByNum(num) {
  return new Promise(function (resolve, reject) {
    var foundStudent = null;

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].studentNum == num) {
        foundStudent = dataCollection.students[i];
      }
    }

    if (!foundStudent) {
      reject("query returned 0 results");
      return;
    }

    resolve(foundStudent);
  });
}

function getStudentsByCourse(course) {
  return new Promise(function (resolve, reject) {
    var filteredStudents = [];

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].course == course) {
        filteredStudents.push(dataCollection.students[i]);
      }
    }

    if (filteredStudents.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(filteredStudents);
  });
}
function addStudent(studentData) {
  return new Promise((resolve, reject) => {
    if (studentData.TA === undefined) {
      studentData.TA = false;
    } else {
      studentData.TA = true;
    }

    studentData.studentNum = dataCollection.students.length + 1;

    dataCollection.students.push(studentData);

    resolve();
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentByNum,
  getStudentsByCourse,
  addStudent,
};
