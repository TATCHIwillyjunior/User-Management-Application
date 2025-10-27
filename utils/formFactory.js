export const formFactory = () => {
	const form = document.createElement("form")

	const nameLabel = document.createElement("label")
	nameLabel.htmlFor = "userName"
	nameLabel.classList.add("form-label")
	nameLabel.textContent = "User's Name"
	//  <label for="exampleInputEmail1" class="form-label">Email address</label>

	const nameInput = inputFactory("text", "userName", "form-control", "namelHelp")

    const ageLabel = document.createElement("label")
    ageLabel.htmlFor = "userAge"
    ageLabel.classList.add("form-label")
    ageLabel.textContent = "User's Age"
    // <label for="exampleInputEmail1" class="form-label">Email address</label>

    const ageInput = inputFactory("number", "userAge", "form-control", "ageHelp")

    const imageLabel = document.createElement("label")
    imageLabel.htmlFor = "userImage"
    imageLabel.classList.add("form-label")
    imageLabel.textContent = "User's Image URL"
    // <label for="exampleInputEmail1" class="form-label">Email address</label>

    const imageInput = inputFactory("text", "userImage", "form-control", "imageHelp")

    const genderLabel = document.createElement("label")
    genderLabel.htmlFor = "userGender"
    genderLabel.classList.add("form-label")
    genderLabel.textContent = "User's Gender"
    // <label for="exampleInputEmail1" class="form-label">Email address</label>

    const genderInput = inputFactory("text", "userGender", "form-control", "genderHelp")
	
	form.appendChild(nameLabel)
	form.appendChild(nameInput)

    form.appendChild(ageLabel)
    form.appendChild(ageInput)

    form.appendChild(imageLabel)
    form.appendChild(imageInput)

    form.appendChild(genderLabel)
    form.appendChild(genderInput)

	document.querySelector(".modal-body").appendChild(form)

	return form
}

const inputFactory = (type, id, className, ariaDescribedby) => {
	const input = document.createElement("input")
	input.type = type
	input.id = id
	input.classList.add(className)
	input.ariaDescribedby = ariaDescribedby
	return input
}

const labelFactory = (text, htmlFor) => {
	const label = document.createElement("label")
	label.htmlFor = htmlFor
	label.classList.add("form-label")
	label.textContent = text
	return label
}





