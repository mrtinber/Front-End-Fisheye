/* eslint-disable linebreak-style */
const filterSelect = document.getElementById("filter_select");
const filterText = document.getElementById("filter_text");
const filterArrow = document.querySelector(".filterbar i");
const filterOptions = document.getElementById("filter_options");
const filterChoice = document.querySelectorAll(".filter_choice");

let isOpen = false;

filterSelect.addEventListener("click", toggleDropDown);
filterSelect.addEventListener("keydown", handleDropdownKeydown);
filterChoice.forEach(choice => {
  choice.addEventListener("keydown", handleOptionKeydown);
});

function toggleDropDown() {
  isOpen = !isOpen;
  filterSelect.setAttribute("aria-expanded", isOpen);
  if (isOpen) {
    filterOptions.classList.add("show");
    filterSelect.classList.add("show");
    filterArrow.style.rotate = "-180deg";
    filterChoice.forEach(choice => {
      choice.setAttribute("tabindex", "0");
    });
    filterChoice[0].focus();
  } else {
    filterOptions.classList.remove("show");
    filterSelect.classList.remove("show");
    filterArrow.style.rotate = "0deg";
    filterChoice.forEach(choice => {
      choice.removeAttribute("tabindex");
    });
  }
}

window.onclick = function (e) {
  if (
    e.target.id !== "filter_select"
  ) {
    filterOptions.classList.remove("show");
    filterArrow.style.rotate = "0deg";
  }
};

filterChoice.forEach(choice => {
  choice.addEventListener("click", () => {
    filterText.innerText = choice.innerText;
  });
});

function handleDropdownKeydown(event) {
  switch (event.key) {
    case "Enter":
      toggleDropDown();
      break;
    case "Escape":
      isOpen = false;
      filterSelect.setAttribute("aria-expanded", isOpen);
      filterChoice.forEach(choice => {
        choice.removeAttribute("tabindex");
      });
      break;
    case "ArrowUp":
    case "ArrowDown":
      if (!isOpen) {
        toggleDropDown();
      }
      break;
  }
}

function handleOptionKeydown(event) {
  const currentIndex = Array.from(filterChoice).indexOf(event.target);
  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      if (currentIndex > 0) {
        filterChoice[currentIndex - 1].focus();
      }
      break;
    case "ArrowDown":
      event.preventDefault();
      if (currentIndex < filterChoice.length - 1) {
        filterChoice[currentIndex + 1].focus();
      }
      break;
    case "Enter":
      filterText.innerText = event.currentTarget.innerText;
      filterOptions.classList.remove("show");
      filterArrow.style.rotate = "0deg";
      filterSelect.setAttribute("aria-expanded", false);
      filterChoice.forEach(choice => {
        choice.removeAttribute("tabindex");
      });
      filterSelect.focus();
      break;
    case "Escape":
      toggleDropDown();
      break;
  }
}
