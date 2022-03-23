let form = document.getElementById("student");

function findStudent () {

    let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(form.value))
    .map((student) => student.firstName + " " + student.lastName);

    return student;
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