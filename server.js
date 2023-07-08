/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _Alexander THomas Student ID: __133475228_____ Date: __17th June 2023_______
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
const express = require('express');
const path = require('path');
const collegeData = require('./modules/collegeData');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Other middleware and configuration

// Route to get all students
app.get('/students', (req, res) => {
  collegeData.getAllStudents()
    .then(students => {
      if (students.length === 0) {
        res.json({ message: "no results" });
      } else {
        res.json(students);
      }
    })
    .catch(() => {
      res.json({ message: "no results" });
    });
});
// Route to handle adding a new student
app.post('/students/add', (req, res) => {
  const studentData = req.body;

  collegeData.addStudent(studentData)
    .then(() => {
      res.redirect('/students');
    })
    .catch(() => {
      res.status(500).send('Error adding student');
    });
});


// Route to get students by course
app.get('/students/course', (req, res) => {
  const course = req.query.value;
  collegeData.getStudentsByCourse(course)
    .then(students => {
      if (students.length === 0) {
        res.json({ message: "no results" });
      } else {
        res.json(students);
      }
    })
    .catch(() => {
      res.json({ message: "no results" });
    });
});

// Route to get all TAs
app.get('/tas', (req, res) => {
  collegeData.getTAs()
    .then(tas => {
      if (tas.length === 0) {
        res.json({ message: "no results" });
      } else {
        res.json(tas);
      }
    })
    .catch(() => {
      res.json({ message: "no results" });
    });
});

// Route to get all courses
app.get('/courses', (req, res) => {
  collegeData.getCourses()
    .then(courses => {
      if (courses.length === 0) {
        res.json({ message: "no results" });
      } else {
        res.json(courses);
      }
    })
    .catch(() => {
      res.json({ message: "no results" });
    });
});

// Route to get student by number
app.get('/student/:num', (req, res) => {
  const num = req.params.num;
  collegeData.getStudentByNum(num)
    .then(student => {
      if (student === null) {
        res.json({ message: "no results" });
      } else {
        res.json(student);
      }
    })
    .catch(() => {
      res.json({ message: "no results" });
    });
});

// Route to serve home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Route to serve about.html
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route to serve htmlDemo.html
app.get('/htmlDemo', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});
app.get('/students/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'addStudent.html'));
});

// Route for unmatched routes
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Initialize collegeData module
collegeData.initialize()
  .then(() => {
    // Start the server
    app.listen(HTTP_PORT, () => {
      console.log(`Server running on port `);
    });
  })
  .catch((err) => {
    console.error(err);
  });
