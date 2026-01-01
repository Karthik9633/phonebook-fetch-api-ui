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

        card.querySelector(".delete").addEventListener("click", () => {
            contacts = contacts.filter(c => c.id !== contact.id);
            renderContacts(contacts);
        });

        card.querySelector(".edit").addEventListener("click", () => {
            card.innerHTML = `
        <input value="${contact.name}">
        <input value="${contact.phone}">
        <div class="actions">
          <button class="save">Save</button>
        </div>
      `;

            const [nameEdit, phoneEdit] = card.querySelectorAll("input");

            card.querySelector(".save").addEventListener("click", () => {
                const newName = nameEdit.value.trim();
                const newPhone = phoneEdit.value.trim();

                if (newName === "" || newPhone === "") {
                    alert("All fields required");
                    return;
                }

                if (contacts.some(c => c.phone === newPhone && c.id !== contact.id)) {
                    alert("Duplicate phone number");
                    return;
                }

                contact.name = newName;
                contact.phone = newPhone;
                showContacts(contacts);
            });
        });

        grid.appendChild(card);
    });
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name === "" || phone === "") {
    alert("All fields required");
    return;
  }

  if (contacts.some(c => c.phone === phone)) {
    alert("Duplicate phone number");
    return;
  }

  contacts.push({ id: Date.now(), name, phone });

  nameInput.value = "";
  phoneInput.value = "";

  showContacts(contacts);
  showToast();
});