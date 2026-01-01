const grid = document.getElementById("contactGrid")
const addBtn = document.getElementById("addBtn")
const nameInput = document.getElementById("nameInput")
const phoneInput = document.getElementById("phoneNumberInput")
const searchInput = document.getElementById("searchInput")
const toast = document.getElementById("message")

let contacts = [];

async function loadContacts() {
  const response = await fetch("c.json");
  contacts = await response.json();
  showContacts(contacts)
}

function showContacts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">No contacts found</p>`;
    return;
  }

  list.forEach(contact => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${contact.name}</h4>
      <p>${contact.phone}</p>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

   
  });
}