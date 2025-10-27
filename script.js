// // fetch("https://easy-simple-users-rest-api.onrender.com")
// // 	.then((response) => response.text())
// // 	.then((data) => console.log(data))

// OR

// const fetchData = async () => {
//     const response = await fetch(
//         "https://easy-simple-users-rest-api.onrender.com"
//     )
//     const data = await response.text()
//     console.log(data);

// }
// fetchData()

import { fetchData } from "./utils/fetchData.js";
import { formFactory } from "./utils/formFactory.js";
import { putData } from "./utils/putData.js";

const remoteUrl = "https://easy-simple-users-rest-api.onrender.com/api/users"; // try with /api/users too
const localUrl = "../New/mock-data/response.json";

const factory = (type) => {
  return "Hello from factory ";
};
console.log(factory());

let users = []; // to hold fetched users data

// ...existing code...
// DOM elements (use IDs and safe fallbacks)
const alert = document.querySelector(".alert") || null;
//const spinner = document.getElementById("spin") || document.querySelector(".spinner-border") || null;

// ...existing code...

// Some codde has been review with GPT to improve error handling and user feedback
//
//
const loadData = async () => {
  // query spinner when we need it (DOM is ready because we call loadData on DOMContentLoaded)
  const spinner = document.getElementById("spin") || document.querySelector(".spinner-border");
  if (spinner?.classList) spinner.classList.remove("d-none");

  try {
    console.log("Please We are Fetching your....");
    const data = await fetchData(remoteUrl); // fetch data from remoteUrl or localUrl
    if (data) {
      if (spinner?.classList) spinner.classList.add("d-none");
      users = data.data; // set the users variable
      displayUsers(users); // pass users to displayUsers
      addEventListeners(); // call addEventListeners after displaying users
      updateCard();
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    if (spinner?.classList) spinner.classList.add("d-none");

    if (alert) {
      alert.classList.remove("d-none");
      alert.classList.add("alert-danger");
      alert.innerHTML = `Failed to load data: ${error.message}`;
    }
  }
};

// ...existing code...
// run after DOM is ready to ensure elements exist
document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
// ...existing code...

// const data = await fetchData(url) // using await outside the async func will cause a syntax error if not define in the script as type="module"
// console.log(data);



const updateCard = (user) => {
  const cardsArray = Array.from(document.querySelectorAll(".card"));

  const foundCard = cardsArray.find((card) => {
    return (
      card.querySelector("button").getAttribute("data-user-id") === user.id
    );
  });
  foundCard.innerHTML = `
				<div class="card-image p-3">
					<img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-cover" />
					<span class="card-title">${user.name}</span>
				</div>

				<div class="card-content">
					<ul class="list-group">
						<li class="list-group-item"><strong>Name: </strong>${user.name}</li>
						<li class="list-group-item"><strong>Age: </strong>${user.age}</li>
						<li class="list-group-item">
							<strong>Gender: </strong> ${user.gender}
						</li>
					</ul>
					<button data-user-id="${user.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>

`;
  console.log(foundCard);
};

const displayUsers = (localUsers) => {
  if (!localUsers || localUsers.length === 0) {
    alert.classList.remove("d-none");
    alert.classList.add("alert-danger");
    alert.innerHTML = "No users found.";
    return;
  }
  localUsers.forEach((user) => {
    const usersContainer = document.getElementById("users-container");
    usersContainer.innerHTML += `
		<article class="card">
				<div class="card-image">
					<img src="${user.avatar_url}" alt="${user.name}" class="card-img-top" />
					<span class="card-title">${user.name}</span>
				</div>

				<div class="card-content">
					<ul class="list-group">
						<li class="list-group-item"><strong>Name:</strong>${user.name}</li>
						<li class="list-group-item"><strong>Age:</strong>${user.age}</li>
						<li class="list-group-item">
							<strong>Role:</strong> ${user.gender}
						</li>
					</ul>
					<button data-user-id="${user.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>
			</article>
`;
  });
};

const addEventListeners = () => {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".modal-body").innerHTML = "";
      document.querySelector(".modal-body").appendChild(formFactory());
      const foundUser = users.find(
        (user) => user.id === parseInt(e.target.getAttribute("data-user-id"))
      );
      getModalForm(foundUser);
    });
  });

  const getModalForm = (foundUser) => {
    const modalForm = document
      .querySelector(".modal-body")
      .querySelector("form");

    modalForm.userName.value = foundUser.name;
    modalForm.userAge.value = foundUser.age;
    modalForm.userImage.value = foundUser.avatar_url;
    modalForm.userGender.value = foundUser.gender;
    submitBtn.setAttribute("data-user-id", foundUser.id);
  };

  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.addEventListener("click", async () => {
    const dataToSend = {
      name: document.querySelector("#userName").value,
      age: document.querySelector("#userAge").value,
      avatar_url: document.querySelector("#userImage").value,
      gender: document.querySelector("#userGender").value,
      id: document.querySelector(".submit-btn").getAttribute("data-user-id"),
    };

    //add spinner
    document.querySelector(".modal-body").innerHTML = `
    	<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
    		<div class="spinner-border" role="status">
    			<span class="visually-hidden">Loading...</span>
    		</div>
    	</div>
    `;
    // const putDataResponse = await putData(remoteUrl, dataToSend)

    // console.log(putDataResponse)

    try {
      const response = await putData(remoteUrl, dataToSend);

      if (response) {
        document.querySelector(".modal-body").innerHTML = `
		<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-success" role="alert">
				${response.message}
			</div>
		</div>
		`;
        //console.log(response)
        // dismiss modal
        const myModal = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(myModal);

        updateCard(dataToSend);

        setTimeout(() => {
          modal.hide();
          addEventListeners(); // re-attach event listeners
        }, 700);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
      document.querySelector(".modal-body").innerHTML = `
		<div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-danger w-100" role="alert">
				${error.message}
			</div>
			<p class="mark">${error.stack}</p>
		</div>
		`;
    }

    //putData(remoteUrl, dataToSend);
  });
};
