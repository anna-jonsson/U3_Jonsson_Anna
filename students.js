//Link to Github repository: https://github.com/anna-jonsson/U3_Jonsson_Anna

//Declaring global variable 'form' for input field with id 'student'

let form = document.getElementById('student')

//Filters database of students on input value (searched lastname) and returns object "student"

function findStudent () {
  let student = DATABASE.students.filter(student =>
    student.lastName.toLowerCase().includes(form.value.toLowerCase())
  )

  //Sorting all student results in alphabetical order based on their lastname

  student.sort(function (a, b) {
    if (a.lastName > b.lastName) {
      return 1
    }

    if (a.lastName < b.lastName) {
      return -1
    }

    return 0
  })

  return student
}

//Event listener for when user enters something in our input field ('form').
//If nothing is entered, show nothing (blank page).
//If something is entered, call functions createHTML() and findStudent() to identify correct students based on the
//search result.

form.addEventListener('keyup', function () {
  let foundStudent = findStudent()

  let wrapper = document.getElementById('results-container')
  wrapper.innerHTML = ''
  createHTML(foundStudent)

  if (form.value == 0) {
    wrapper.innerHTML = ''
  }
})

//Function to render the students into HTML, using parameter 'student', which is later replaced with the 'foundStudent' in
//createHTML() within the event listener above. Other properties rendered are the student's passed credit (in total), student's courses etc.

function renderStudent (student) {
  let passedCredits = getPassedCredits(student)
  let studentTotalCred = passedCredits.reduce(function (a, b) {
    return a + b
  }, 0)

  let wrapper = document.getElementById('results-container')
  let div = document.createElement('div')
  div.classList.add('student-result')
  wrapper.appendChild(div)
  let p = document.createElement('p')
  p.classList.add('result')
  p.innerText =
    '>> ' +
    student.firstName +
    ' ' +
    student.lastName +
    ' / Total credits: ' +
    studentTotalCred
  div.appendChild(p)

  let p2 = document.createElement('p')
  div.appendChild(p2)
  p2.innerText = 'Courses: '

  let foundCourses = getCourseById(student)

  for (let i = 0; i < foundCourses.length; i++) {
    let courseDiv = document.createElement('div')
    div.appendChild(courseDiv)
    courseDiv.innerText =
      foundCourses[i].title +
      ' (started: ' +
      student.courses[i].started.semester +
      ' ' +
      student.courses[i].started.year +
      '), ' +
      student.courses[i].passedCredits +
      ' of ' +
      foundCourses[i].totalCredits +
      ' credits.'
    if (foundCourses[i].totalCredits == student.courses[i].passedCredits) {
      courseDiv.classList.add('passed')
    }
  }
}

//Function including a loop where each student is rendered into HTML, calling the renderStudent function.

function createHTML (students) {
  for (let student of students) {
    renderStudent(student)
  }
}

//Function to identify the student's courses by courseID and pushing them into a new array (foundCourses)

function getCourseById (student) {
  let foundCourses = []

  for (let i = 0; i < student.courses.length; i++) {
    foundCourses.push(
      DATABASE.courses.find(course => {
        return course.courseId == student.courses[i].courseId
      })
    )
  }
  return foundCourses
}

//Function to identify the student's passed credits (through their courses) and pushing them into a new array (passedCredits)

function getPassedCredits (student) {
  let passedCredits = []

  for (let studentCourse of student.courses) {
    for (let dbCourse of DATABASE.courses) {
      if (studentCourse.courseId == dbCourse.courseId) {
        passedCredits.push(studentCourse.passedCredits)
      }
    }
  }

  return passedCredits
}
