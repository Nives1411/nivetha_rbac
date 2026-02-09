const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");

document.getElementById("roleText").innerText = "Role: " + role;

if (role === "ADMIN") {
  loadEmployees();
  empSection.style.display = "none";
} else {
  loadMyWork();
  adminSection.style.display = "none";
}

function loadEmployees() {
  fetch("/users")
    .then(res => res.json())
    .then(data => {
      empTable.innerHTML = "";
      data.forEach(u => {
        empTable.innerHTML += `
          <tr>
            <td>${u.username}</td>
            <td><input value="${u.work}" id="work${u.id}"></td>
            <td>
              <button class="edit" onclick="update(${u.id})">Update</button>
              <button class="delete" onclick="del(${u.id})">Delete</button>
            </td>
          </tr>`;
      });
    });
}

function loadMyWork() {
  fetch("/users/" + userId)
    .then(res => res.json())
    .then(data => {
      myWork.innerText = data.work;
    });
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function addEmployee() {
  fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newUser.value,
      password: newPass.value,
      work: newWork.value
    })
  }).then(() => {
    closeModal();
    loadEmployees();
  });
}

function update(id) {
  fetch("/users/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      work: document.getElementById("work" + id).value
    })
  }).then(() => loadEmployees());
}

function del(id) {
  fetch("/users/" + id, { method: "DELETE" })
    .then(() => loadEmployees());
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}
