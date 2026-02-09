function login() {
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login");
      }
    });
}
