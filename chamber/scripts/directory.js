const directoryContainer = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

const jsonURL = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(jsonURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    if (directoryContainer) {
      directoryContainer.innerHTML = `<p>Error loading members: ${error.message}</p>`;
    }
  }
}

function displayMembers(members) {
  if (!directoryContainer) return;
  directoryContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
    `;

    directoryContainer.appendChild(card);
  });
}

if (gridBtn && directoryContainer) {
  gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid");
    directoryContainer.classList.remove("list");
  });
}

if (listBtn && directoryContainer) {
  listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list");
    directoryContainer.classList.remove("grid");
  });
}

const yearElem = document.getElementById("year");
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}
const lastModifiedElem = document.getElementById("lastModified");
if (lastModifiedElem) {
  lastModifiedElem.textContent = document.lastModified;
}

getMembers();
// Add event listener for menu button
const menuBtn = document.getElementById("menuBtn");
const navList = document.getElementById("navList");
if (menuBtn && navList) {
  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show");
  });
}
// Add event listener for close button
const closeBtn = document.getElementById("closeBtn");
if (closeBtn && navList) {
  closeBtn.addEventListener("click", () => {
    navList.classList.remove("show");
  });
}
    
