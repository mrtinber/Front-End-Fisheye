function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    const surnameInput = document.getElementById("surname");
    surnameInput.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


btnSubmit = document.querySelector(".submit_button")
btnSubmit.addEventListener("click", function(event){
    event.preventDefault();

    const formSurname = document.getElementById("surname");
    const formName = document.getElementById("name");
    const formEmail = document.getElementById("email");
    const formMessage = document.getElementById("message");

    const valueSurname = formSurname.value.trim();
    const valueName = formName.value.trim();
    const valueEmail = formEmail.value.trim();
    const valueMessage = formMessage.value.trim();

    console.log("Ceci est le prénom: ", valueSurname);
    console.log("Ceci est le nom: ", valueName);
    console.log("Ceci est l'adresse e-mail: ", valueEmail);
    console.log("Ceci est le message envoyé: ", valueMessage);
})
