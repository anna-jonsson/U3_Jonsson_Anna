//Link to Github repository: https://github.com/anna-jonsson/U3_Jonsson_Anna

//Declaring global variable 'form' for input field with id 'course'

let form = document.getElementById('course')

//Filters database of courses on input value (searched course title) and returns object "course"

function findCourse () {
  let course = DATABASE.courses.filter(course =>
    course.title.toLowerCase().includes(form.value.toLowerCase())
  )

  //Sorting all course results in alphabetical order based on their title

  course.sort(function (a, b) {
    if (a.title > b.title) {
      return 1
    }

    if (a.title < b.title) {
      return -1
    }

    return 0
  })

  return course
}

//Event listener for when user enters something in our input field ('form'). 
//If nothing is entered, show nothing (blank page). 
//If something is entered, call functions createHTML() and findCourse() to identify correct courses based on the
//search result. 

form.addEventListener('keyup', function () {
  let foundCourse = findCourse()

  let wrapper = document.getElementById('results-container')
  wrapper.innerHTML = ''
  createHTML(foundCourse)

  if (form.value == 0) {
    wrapper.innerHTML = ''
  }
})

//Function to render the courses into HTML, using parameter 'course', which is later replaced with the 'foundCourse' in
//createHTML() within the event listener above. Other properties rendered are the course's total credit, students who
//have taken the course, their total passed credit, course responsible, teachers etc. 

function renderCourse (course) {
  let wrapper = document.getElementById('results-container')
  let div = document.createElement('div')
  wrapper.appendChild(div)
  let p = document.createElement('p')
  p.classList.add('result')
  p.innerText = '>> ' + course.title + ' / ' + course.totalCredits + ' credits'
  div.appendChild(p)

  //Course responsible, template for HTML rendering

  let foundRep = findCourserep(course)
  let foundTeacher = findTeachers(course)

  let reps = document.createElement('div')
  div.appendChild(reps)
  reps.innerText = 'Course responsible: '
  reps.classList.add('classrep')

  for (let i = 0; i < foundRep.length; i++) {
    let courseRep = document.createElement('p')
    reps.appendChild(courseRep)
    courseRep.classList.add('rep')
    courseRep.innerText =
      foundRep[i].firstName +
      ' ' +
      foundRep[i].lastName +
      ' (' +
      foundRep[i].post +
      ')'
  }

  //Teachers involved in the course, template for HTML rendering

  let teacherDiv = document.createElement('div')
  div.appendChild(teacherDiv)
  teacherDiv.innerText = 'Teachers: '
  teacherDiv.classList.add('teacher')

  for (let i = 0; i < foundTeacher.length; i++) {
    let teacher = document.createElement('p')
    teacherDiv.appendChild(teacher)
    teacher.innerText =
      foundTeacher[i].firstName +
      ' ' +
      foundTeacher[i].lastName +
      ' (' +
      foundTeacher[i].post +
      ')'
  }

  let foundStudent = getStudentById(course)

  //Identifying the course-involved students' array of courses and pushing them into a new array (studentCourses)

  let studentCourses = []

  for (let student of foundStudent) {
    for (let studentCourse of student.courses) {
      if (studentCourse.courseId == course.courseId) {
        studentCourses.push(studentCourse)
      }
    }
  }

  //Students involved in the course, template for HTML rendering

  let studentDiv = document.createElement('div')
  div.appendChild(studentDiv)
  studentDiv.innerHTML = 'Students: '
  studentDiv.classList.add('student')

  for (let i = 0; i < foundStudent.length; i++) {
    let students = document.createElement('div')
    studentDiv.appendChild(students)
    students.innerText =
      foundStudent[i].firstName +
      ' ' +
      foundStudent[i].lastName +
      ' (' +
      studentCourses[i].passedCredits +
      ' credits) - Started: ' +
      studentCourses[i].started.semester +
      ' ' +
      studentCourses[i].started.year

    if (studentCourses[i].passedCredits == course.totalCredits) {
      students.classList.add('passed')
    }
  }
}

//Identify the students involved in the course and push them into a new array (foundStudent)

function getStudentById (course) {
  let foundStudent = []

  for (let student of DATABASE.students) {
    for (let studentCourse of student.courses) {
      if (studentCourse.courseId == course.courseId) {
        foundStudent.push(student)
      }
    }
  }

  return foundStudent
}

//Identify the course's course responsible and pushing them into a new array (foundRep)

function findCourserep (course) {
  let foundRep = []

  for (let teacher of DATABASE.teachers) {
    if (teacher.teacherId == course.courseResponsible) {
      foundRep.push(teacher)
    }
  }

  return foundRep
}

//Identify the teachers involved in the course and push them into a new array (foundTeacher)

function findTeachers (course) {
  let foundTeacher = []

  for (let teacher of DATABASE.teachers) {
    for (let courseTeacher of course.teachers) {
      if (courseTeacher == teacher.teacherId) {
        foundTeacher.push(teacher)
      }
    }
  }

  return foundTeacher
}

//Function including a loop where each course is rendered into HTML, calling the renderCourse function. 

function createHTML (courses) {
  for (let course of courses) {
    renderCourse(course)
  }
}
