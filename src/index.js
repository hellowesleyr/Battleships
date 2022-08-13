import { doc } from "prettier";
import "./styles/style.css";
import { countries } from "country-list-json";

const formManager = (() => {
  const myForm = document.querySelector(".formWrapper");

  const formElements = Array.from(myForm.children);
  const emailInput = document.getElementById("signUpEmail");
  const postcodeInput = document.getElementById("signUpPostcode");
  const countryInput = document.getElementById("signUpCountry");
  const passwordInput = document.getElementById("signUpPassword");
  const confirmpwInput = document.getElementById("signUpConfirmPassword");
  const formInputs = [emailInput,postcodeInput,countryInput,passwordInput,confirmpwInput];

  const initializeCountrySelect = () => {
    countries.forEach((country) => {
      const thisOption = document.createElement("option");
      thisOption.classlist = "coption";
      thisOption.value = country.name;
      thisOption.innerText = country.name;
      countryInput.appendChild(thisOption);
    });
  };

  const displayErrorMessage = (element) => {
    const elementError = element.nextElementSibling;
    elementError.innerText = element.validationMessage;
  };

  const validateEmail = () => {
    const emailString = emailInput.value;
    const { validity } = emailString;
    if (emailString === "") {
      emailInput.setCustomValidity("");
      return;
    }
    if (!emailString.includes("@")) {
      emailInput.setCustomValidity("An email must include an @");
    } else if (emailString.length < 6) {
      emailInput.setCustomValidity("An email needs at least 6 characters");
    } else {
      emailInput.setCustomValidity("");
    }
  };

  const validatePostcode = () => {
    const thisRegex =
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
    const postcodeString = postcodeInput.value;
    if (!thisRegex.test(postcodeString)) {
      postcodeInput.setCustomValidity("Please enter a valid UK postcode");
    }
    if (thisRegex.test(postcodeString)) {
      postcodeInput.setCustomValidity("");
    }
  };

  const validatePassword = () => {
    const passwordString = passwordInput.value;
    const uppercaseRegex = /\.*[A-Z]\.*/;
    const numberRegex = /\.*[0-9]\.*/;

    passwordInput.setCustomValidity("");
    if (passwordString.length < 7) {
      passwordInput.setCustomValidity(
        "A password requires at least 7 characters"
      );
    } else if (!uppercaseRegex.test(passwordString)) {
      passwordInput.setCustomValidity(
        "A password requires an uppercase letter"
      );
    }
    else if (!numberRegex.test(passwordString)) {
      passwordInput.setCustomValidity(
        'A password requires a number'
      )
    }
  };

  const validateConfirmPassword = () => {
    const confirmPasswordString = confirmpwInput.value;
    const passwordString = passwordInput.value;
    if (!(confirmPasswordString === passwordString)) {
      confirmpwInput.setCustomValidity("Must match password");
    } else if (confirmPasswordString === passwordString) {
      confirmpwInput.setCustomValidity("");
    }
  };

  emailInput.addEventListener("input", (event) => {
    validateEmail();
    displayErrorMessage(emailInput);
  });

  postcodeInput.addEventListener("input", (event) => {
    validatePostcode();
    displayErrorMessage(postcodeInput);
  });

  passwordInput.addEventListener("input", (event) => {
    validatePassword();
    validateConfirmPassword();
    displayErrorMessage(passwordInput);
    displayErrorMessage(confirmpwInput);
  });

  confirmpwInput.addEventListener("input", (event) => {
    validateConfirmPassword();
    displayErrorMessage(confirmpwInput);
  });

  const validateForm = () => {
    let validForm = true;
    formInputs.forEach(input => {
      const validityState = input.validity;
      if (validityState.valid !== true) {
        validForm = false;
      }
    });
    if (validForm === true) {
      alert("high five");
    }
  };

  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateForm();
  });
  initializeCountrySelect();
})();
// REMOVE DEBUG STUFF
