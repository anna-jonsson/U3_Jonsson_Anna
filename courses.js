let form = document.getElementById('course')

function findCourse () {
  let course = DATABASE.courses.filter(course =>
    course.title.toLowerCase().includes(form.value.toLowerCase())
  )

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

form.addEventListener('keyup', function () {
  let foundCourse = findCourse()

  let wrapper = document.getElementById('results-container')
  wrapper.innerHTML = ''
  createHTML(foundCourse)

  if (form.value == 0) {
    wrapper.innerHTML = ''
  }
})

function renderCourse (course) {
  let wrapper = document.getElementById('results-container')
  let div = document.createElement('div')
  wrapper.appendChild(div)
  let p = document.createElement('p')
  p.classList.add('result')
  p.innerText = '>> ' + course.title + ' / ' + course.totalCredits + ' credits'
  div.appendChild(p)

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

  let studentCourses = []

  for (let student of foundStudent) {
    for (let studentCourse of student.courses) {
      if (studentCourse.courseId == course.courseId) {
        studentCourses.push(studentCourse)
      }
    }
  }

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

function findCourserep (course) {
  let foundRep = []

  for (let teacher of DATABASE.teachers) {
    if (teacher.teacherId == course.courseResponsible) {
      foundRep.push(teacher)
    }
  }

  return foundRep
}

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

function createHTML (courses) {
  for (let course of courses) {
    renderCourse(course)
  }
}
