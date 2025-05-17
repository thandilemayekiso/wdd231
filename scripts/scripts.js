const courses = [
  { name: "WDD 130", subject: "web", credits: 3, completed: true },
  { name: "WDD 131", subject: "web", credits: 3, completed: false },
  { name: "WDD 231", subject: "web", credits: 3, completed: false },
  { name: "DES 150", subject: "design", credits: 2, completed: true },
  { name: "DES 250", subject: "design", credits: 2, completed: false },
];

function displayCourses(filtered = "all") {
  const list = document.getElementById("courseList");
  list.innerHTML = "";

  const filteredCourses = filtered === "all"
    ? courses
    : courses.filter(c => c.subject === filtered);

  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    if (course.completed) div.classList.add("completed");
    div.textContent = `${course.name} - ${course.credits} credits`;
    list.appendChild(div);
  });

  const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("creditTotal").textContent = totalCredits;
}

function filterCourses(subject) {
  displayCourses(subject);
}

function updateFooter() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
}

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navList").classList.toggle("show");
});

updateFooter();
displayCourses();
document.getElementById("allBtn").addEventListener("click", () => displayCourses("all"));
document.getElementById("webBtn").addEventListener("click", () => displayCourses("web"));
