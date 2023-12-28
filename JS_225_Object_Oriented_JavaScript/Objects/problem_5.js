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
  },

  enrollStudent(name, course) {
    let student = this.students.filter(stud => stud.name === name)[0];
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
    let courseExists = this.students.some(student => {
      return student.courses.some(list => {
        return list.name === course && list.grade;
      })
    })

    if (!courseExists) {
      return console.log(undefined);
    }

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
  },
}

school.addstudent('foo', '3rd');
school.enrollStudent('foo', {name: 'Math', code: 101})
school.enrollStudent('foo', {name: 'Advanced Math', code: 102})
school.enrollStudent('foo', {name: 'Physics', code: 202})
school.addGrade('foo', 101, 95);
school.addGrade('foo', 102, 90);

school.addstudent('bar', '1st');
school.enrollStudent('bar', {name: 'Math', code: 101})
school.addGrade('bar', 101, 91);

school.addstudent('qux', '2nd');
school.enrollStudent('qux', {name: 'Math', code: 101})
school.enrollStudent('qux', {name: 'Advanced Math', code: 102})
school.addGrade('qux', 101, 93);
school.addGrade('qux', 102, 90);

school.getReportCard('foo');
console.log('------')

school.courseReport('Math');
console.log('------')

school.courseReport('Advanced Math');
console.log('------')

school.courseReport('Physics');

/* LS Solution

const school = {
  students: [],
  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      const student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode})
  },

  addGrade(student, courseName, grade) {
    const course = student.listCourses().filter(({name}) => name === courseName)[0];

    if (course) {
      course.grade = grade;
    }
  },

  getReportCard(student) {
    student.listCourses().forEach(({grade, name}) => {
      if (grade) {
        console.log(`${name}: ${String(grade)}`);
      } else {
        console.log(`${name}: In progress`);
      }
    });
  },

  courseReport(courseName) {
    function getCourse(student, courseName) {
      return student.listCourses().filter(({name}) => name === courseName)[0];
    }

    const courseStudents = this.students.map(student => {
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

*/