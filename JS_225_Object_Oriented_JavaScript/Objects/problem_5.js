// School

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

// School

let school = {
  students: [],
  addstudent(name, year) {
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];
    let newStudent;
    if (validYears.includes(year)) {
      newStudent = createStudent(name, year);
      this.students.push(newStudent)
    } else {
      return "Invalid Year"
    }
    return newStudent;
  },
  
  enrollStudent(name, course) {
    let student = this.students.filter(stud => stud.name === name)[0];
    console.log(student);
    if (student) {
      student.addCourse(course);
    } else {
      return "Invalid student name"
    }
  },

  addGrade(name, code, grade) {
    let student = this.students.filter(stud => stud.name === name)[0];

    if (student) {
      let course = student.courses.filter(course => course.code === code)[0];

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
    let student = this.students.filter(stud => stud.name === name)[0];

    if (student) {
      student.courses.forEach(course => {
        let grade = course.grade || "In Progress";
        console.log(course.name + ': ' + grade);
      })
    } else {
      return "Invalid Student Name"
    }
  },

  courseReport(course) {
    console.log(`=${course} Grades=`);
    let sum = 0;
    let count = 0;
    this.students.forEach(student => {
      let hasCourse = student.courses.filter(c => c.name === course)[0];

      if (hasCourse) {
        sum += hasCourse.grade;
        count += 1;
        console.log(student.name + ': ' + hasCourse.grade)
      }
    })
    console.log('---');
    console.log('Course Average: ' + String(sum / count))
  }
}

school.addstudent('foo', '3rd');
school.enrollStudent('foo', {name: 'Math', code: 101})
school.addGrade('foo', 101, 95);
console.log(school);
school.getReportCard('foo');
school.courseReport('Math');