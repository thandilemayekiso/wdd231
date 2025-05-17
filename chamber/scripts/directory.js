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
    directoryContainer.innerHTML = `<p>Error loading members: ${error.message}</p>`;
  }
}

function displayMembers(members) {
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

gridBtn.addEventListener("click", () => {
  directoryContainer.classList.add("grid");
  directoryContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  directoryContainer.classList.add("list");
  directoryContainer.classList.remove("grid");
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

getMembers();
// Add event listener for menu button
document.getElementById("menuBtn").
    addEventListener("click", () => {
        document.getElementById("navList").classList.toggle("show");
    });
// Add event listener for close button
document.getElementById("closeBtn").
    addEventListener("click", () => {
        document.getElementById("navList").classList.remove("show");
    });
    
