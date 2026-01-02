const grid = document.getElementById("contactGrid")
const addBtn = document.getElementById("addBtn")
const nameInput = document.getElementById("nameInput")
const phoneInput = document.getElementById("phoneNumberInput")
const searchInput = document.getElementById("searchInput")
const message = document.getElementById("toast");

let contacts = []

function isValidName(name) {
  return /^[A-Za-z ]{2,}$/.test(name)
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone)
}

async function loadContacts() {
  const response = await fetch("data/contact.json")
  contacts = await response.json()
  showContacts(contacts)
}

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `toast ${type}`;
  message.style.display = "block";

  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}

function showContacts(list) {
  grid.innerHTML = ""

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">No contacts found</p>`
    return
  }

  list.forEach(contact => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <h4>${contact.name}</h4>
      <p>${contact.phone}</p>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `

    card.querySelector(".delete").addEventListener("click", () => {
      contacts = contacts.filter(c => c.id !== contact.id)
      showContacts(contacts)
      showMessage("✅ Contact deleted", "success")
    })

    card.querySelector(".edit").addEventListener("click", () => {
      card.innerHTML = `
        <input type="text" value="${contact.name}">
        <input type="text" value="${contact.phone}">
        <div class="actions">
          <button class="save">Save</button>
        </div>
      `

      const [nameEdit, phoneEdit] = card.querySelectorAll("input")

      card.querySelector(".save").addEventListener("click", () => {
        const newName = nameEdit.value.trim()
        const newPhone = phoneEdit.value.trim()

        if (!isValidName(newName)) {
  showMessage("❌ Invalid name")
  return
}

if (!isValidPhone(newPhone)) {
  showMessage("❌ Phone must be 10 digits")
  return
}


        if (contacts.some(c => c.phone === newPhone && c.id !== contact.id)) {
          showMessage("❌ Phone number already exists")
          return
        }

        contact.name = newName
        contact.phone = newPhone

        showContacts(contacts)
        showMessage("✅ Contact updated", "success")
      })
    })

    grid.appendChild(card)
  })
}
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim()
  const phone = phoneInput.value.trim()

  if (!isValidName(name)) {
    showMessage("❌ Enter valid name (letters only)")
    return
  }

  if (!isValidPhone(phone)) {
    showMessage("❌ Phone must be 10 digits")
    return
  }

  if (contacts.some(c => c.phone === phone)) {
    showMessage("❌ Phone number already exists")
    return
  }

  contacts.push({
    id: Date.now(),
    name,
    phone
  })

  nameInput.value = ""
  phoneInput.value = ""

  showContacts(contacts)
  showMessage("✅ Contact added successfully", "success")
})


searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase()

  const result = contacts.filter(c =>
    c.name.toLowerCase().includes(value) ||
    c.phone.includes(value)
  )

  showContacts(result)
})

loadContacts()
