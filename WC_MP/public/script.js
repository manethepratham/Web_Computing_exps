document.addEventListener('DOMContentLoaded', () => {
  const usersList = document.getElementById('users-list');
  const addUserForm = document.getElementById('add-user-form');
  const updateUserSection = document.getElementById('update-user-section');
  const updateUserForm = document.getElementById('update-user-form');

  // Fetch and display users
  async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    usersList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      
      const userName = document.createElement('span');
      userName.textContent = `ID: ${user.id}, Name: ${user.name}`;

      const buttonsDiv = document.createElement('div');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteUser(user.id);

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.onclick = () => showUpdateForm(user);

      buttonsDiv.appendChild(updateButton);
      buttonsDiv.appendChild(deleteButton);

      li.appendChild(userName);
      li.appendChild(buttonsDiv);
      usersList.appendChild(li);
    });
  }

  // Add a new user
  addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    fetchUsers();
    addUserForm.reset();
  });

  // Delete a user
  async function deleteUser(id) {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  }

  // Show the update form
  function showUpdateForm(user) {
    updateUserSection.style.display = 'block';
    document.getElementById('update-id').value = user.id;
    document.getElementById('update-name').value = user.name;
  }

  // Update a user
  updateUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    fetchUsers();
    updateUserForm.reset();
    updateUserSection.style.display = 'none';
  });

  // Initial fetch
  fetchUsers();
});
