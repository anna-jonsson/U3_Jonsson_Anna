let form = document.getElementById("student");

function findStudent () {

    let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(form.value))
    .map((student) => student.firstName + " " + student.lastName);

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
    let wrapper = document.getElementById("results-container");
    let div = document.createElement("div");
    div.classList.add("result"); 

    div.innerHTML = student;
    wrapper.appendChild(div);
}

function createHTML (students) {
        console.log(students);
   
        for (let student of students) {
            renderStudent(student)
        }
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