// School Improved

// Student object

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }

    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        course.note = note;
      }
    },
  };
}

// School (Improved)

let school = (() => {
  let students = [];
  let validYears = ['1st', '2nd', '3rd', '4th', '5th'];

  function getCourse(student, courseName) {
    return student.listCourses().filter(({name}) => name === courseName)[0];
  }

  return {
    addstudent(name, year) {
      let newStudent;
      if (validYears.includes(year)) {
        newStudent = createStudent(name, year);
        students.push(newStudent)
      } else {
        return "Invalid Year"
      }
    },

    enrollStudent(name, course) {
      let student = students.filter(stud => stud.name === name)[0];
      if (student) {
        student.addCourse(course);
      } else {
        return "Invalid student name"
      }
    },

    addGrade(name, courseName, grade) {
      let student = students.filter(stud => stud.name === name)[0];

      if (student) {
        let course = getCourse(student, courseName);

        if (course) {
          course.grade = grade;
        } else {
          return "Invalid course";
        }
      } else {
        return "Invalid Student";
      }
    },

    getReportCard(name) {
      let student = students.filter(stud => stud.name === name)[0];

      if (student) {
        student.courses.forEach(course => {
          let grade = course.grade || "In Progress";
          console.log(course.name + ': ' + grade);
        })
      } else {
        return "Invalid Student Name"
      }
    },

    courseReport(courseName) {
      const courseStudents = students.map(student => {
        const course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(({grade}) => grade);
  
      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);
  
        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;
  
        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  };
})();

school.addstudent('foo', '3rd');
school.enrollStudent('foo', {name: 'Math', code: 101})
school.enrollStudent('foo', {name: 'Advanced Math', code: 102})
school.enrollStudent('foo', {name: 'Physics', code: 202})
school.addGrade('foo', 'Math', 95);
school.addGrade('foo', 'Advanced Math', 90);

school.addstudent('bar', '1st');
school.enrollStudent('bar', {name: 'Math', code: 101})
school.addGrade('bar', 'Math', 91);

school.addstudent('qux', '2nd');
school.enrollStudent('qux', {name: 'Math', code: 101})
school.enrollStudent('qux', {name: 'Advanced Math', code: 102})
school.addGrade('qux', 'Math', 93);
school.addGrade('qux', 'Advanced Math', 90);

school.getReportCard('foo');
console.log('------')

school.courseReport('Math');
console.log('------')

school.courseReport('Advanced Math');
console.log('------')

school.courseReport('Physics');