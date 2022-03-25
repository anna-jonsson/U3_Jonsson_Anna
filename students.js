let form = document.getElementById("student");

//Filters database of students on input value (searched lastname) and returns object "Student"

function findStudent () {

    let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(form.value.toLowerCase()));

    student.sort(function(a, b) {
	
        if (a.firstName > b.firstName) {
            return 1;
        }
        
        if (a.firstName < b.firstName) {
            return -1;
        }
        
        return 0;
        
    });

    return student;
}

form.addEventListener("keyup", function() {

    let foundStudent = findStudent();

    let wrapper = document.getElementById("results-container");
    wrapper.innerHTML = "";
    createHTML(foundStudent);

    if (form.value == 0) {
        wrapper.innerHTML = "";
    }
    
});

function renderStudent (student) {

    let studentCourse = getStudentCourses(student);
    let studentTotalCred = studentCourse.reduce(function(a, b){return a + b}, 0);

    let wrapper = document.getElementById("results-container");
    let div = document.createElement("div"); 
    wrapper.appendChild(div);
    let p = document.createElement("p");
    p.classList.add("result");
    p.innerText = student.firstName + " " + student.lastName + " / Total credits: " + studentTotalCred; 
    div.appendChild(p);

    let foundCourses = getCourseById(student)

    for (let i = 0 ; i < foundCourses.length ; i++) {
        let courseDiv = document.createElement("div");
        div.appendChild(courseDiv);
        courseDiv.innerText = 
        foundCourses[i].title + " (started: " + student.courses[i].started.semester + " " + student.courses[i].started.year + "), " + student.courses[i].passedCredits + " of " + foundCourses[i].totalCredits + " credits.";
        if (foundCourses[i].totalCredits == student.courses[i].passedCredits) {
            courseDiv.classList.add("passed");
        }
    }
}

function createHTML (students) {
   
    for (let student of students) {
        renderStudent(student);
    }   

}

function getCourseById (student) {
      
let foundCourses = [];

for (let i = 0; i < student.courses.length; i++) {

    foundCourses.push(DATABASE.courses.find(course => {
    return course.courseId == student.courses[i].courseId;
}))
        
    }
    return foundCourses;
};

function getStudentCourses (student) {

    let studentCourses = [];

    for (let studentCourse of student.courses) {
        for (let dbCourse of DATABASE.courses) {
            if (studentCourse.courseId == dbCourse.courseId) {
                studentCourses.push(studentCourse.passedCredits);
            }
        }
    }

    return studentCourses;
}

/* 

students: [
    {
      studentID: 0,
      firstName: "Melinda",
      lastName: "Siebeneicher",
      courses: [
        {
          courseId: 11,
          started: { semester: "Spring", year: 2019 },
          passedCredits: 5,
        },
*/