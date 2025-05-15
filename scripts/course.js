const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "CSE 111", name: "Programming Principles", credits: 4, completed: true },
    { code: "WDD 231", name: "Web Frontend Development II", credits: 3, completed: false },
    // Add more courses if needed
  ];
  
  const courseList = document.getElementById("course-list");
  const totalCreditsSpan = document.getElementById("total-credits");
  
  function displayCourses(filteredCourses) {
    courseList.innerHTML = "";
    let total = 0;
  
    filteredCourses.forEach(course => {
      const card = document.createElement("div");
      card.className = course.completed ? "completed" : "not-completed";
      card.innerHTML = `<strong>${course.code}</strong>: ${course.name} - ${course.credits} credits`;
      courseList.appendChild(card);
      total += course.credits;
    });
  
    totalCreditsSpan.textContent = total;
  }
  
  // Event Listeners for filter buttons
  document.getElementById("all").addEventListener("click", () => {
    displayCourses(courses);
  });
  document.getElementById("wdd").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.code.startsWith("WDD")));
  });
  document.getElementById("cse").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.code.startsWith("CSE")));
  });
  
  // Initial load
  displayCourses(courses);
  