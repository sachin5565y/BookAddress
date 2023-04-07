
// Define the Contact and ContactsList classes
class Contact {
  constructor(name, mobile) {
    this.name = name;
    this.mobile = mobile;
  }
}

class ContactsList {
  constructor() {
    this.contacts = [];
  }

  addContact(name, mobile) {
    const existingContact = this.contacts.find((contact) => contact.mobile === mobile);
    if (existingContact) {
      alert('Duplicate mobile number not allowed.');
    } else {
      const contact = new Contact(name, mobile);
      this.contacts.push(contact);
      alert('Contact added successfully.');
    }
  }
  //   Contact filter
  getFilteredContacts(nameFilter, mobileFilter) {
    return this.contacts.filter((contact) => {
      const nameMatch = contact.name.toLowerCase().includes(nameFilter.toLowerCase());
      const mobileMatch = contact.mobile.toLowerCase().includes(mobileFilter.toLowerCase());
      return nameMatch && mobileMatch;
    });
  }

  //   edit contact
  editContact(index, name, mobile) {
    const existingContact = this.contacts.find((contact) => contact.mobile === mobile && contact !== this.contacts[index]);
    if (existingContact) {
      alert('Duplicate mobile number not allowed.');
    } else {
      this.contacts[index].name = name;
      this.contacts[index].mobile = mobile;
      alert('Contact edited successfully.');
    }
  }
  // delete contact
  deleteContact(index) {
    this.contacts.splice(index, 1);
    alert('Contact deleted successfully.');
  }
}


// Initialize the ContactsList object and populate the table
const contactsList = new ContactsList();

function populateTable() {
  const nameFilter = document.getElementById('nameFilter').value;
  const mobileFilter = document.getElementById('mobileFilter').value;
  const contacts = contactsList.getFilteredContacts(nameFilter, mobileFilter);

  const tableBody = document.querySelector('#contactsTable tbody');
  tableBody.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = tableBody.insertRow();
    const nameCell = row.insertCell();
    const mobileCell = row.insertCell();
    const actionCell = row.insertCell();

    nameCell.textContent = contact.name;
    mobileCell.textContent = contact.mobile;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const name = prompt('Enter the new name:', contact.name);
      const mobile = prompt('Enter the new mobile number:', contact.mobile);
      if (name && mobile) {
        contactsList.editContact(index, name, mobile);
        populateTable();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this contact?')) {
        contactsList.deleteContact(index);
        populateTable();
      }
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

// Add event listeners to the form and filter inputs
const addContactForm = document.getElementById('addContactForm');
addContactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  if (name && mobile) {
    contactsList.addContact(name, mobile);
    addContactForm.reset();
    populateTable();
  }
});

const nameFilterInput = document.getElementById('nameFilter');
nameFilterInput.addEventListener('input', () => {
  populateTable();
});

const mobileFilterInput = document.getElementById('mobileFilter');
mobileFilterInput.addEventListener('input', () => {
  populateTable();
});

// Initial table population
populateTable();
