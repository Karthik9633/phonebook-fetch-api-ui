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
}