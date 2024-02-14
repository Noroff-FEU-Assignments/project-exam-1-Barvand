const form = document.getElementById("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const errorMessageName = document.getElementById("input-error-name");
const errorMessageEmail = document.getElementById("input-error-email");
const errorMessageSubject = document.getElementById("input-error-subject");
const errorMessageMessage = document.getElementById("input-error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (fullName.value.length <= 5) {
    errors.push("Name should contain more than 5 characters");
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    errors.push("Must be a valid email address");
  }

  if (subject.value.length < 15) {
    errors.push("Subject should be more than 15 characters long");
  }

  if (message.value.length < 25) {
    errors.push("The message should be more than 25 characters long");
  }

  // Display errors for each input field
  errorMessageName.innerText = errors
    .filter((err) => err.startsWith("Name"))
    .join(", ");
  errorMessageEmail.innerText = errors
    .filter((err) => err.startsWith("Must"))
    .join(", ");
  errorMessageSubject.innerText = errors
    .filter((err) => err.startsWith("Subject"))
    .join(", ");
  errorMessageMessage.innerText = errors
    .filter((err) => err.startsWith("The"))
    .join(", ");

  // Check other form fields for validation and push errors if necessary

  // Check if there are any errors
  if (errors.length > 0) {
    e.preventDefault();
  }
});
