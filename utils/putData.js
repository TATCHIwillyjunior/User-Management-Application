export const putData = async (url, usersData) => {
    // console.log("Sending data...", url, usersData);
    const updateUrl = `${url}/${usersData.id}`; // Assuming usersData contains an 'id' field
    try {
		const response = await fetch(updateUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				my_key: "my_super_secret_phrase",
			},
			body: JSON.stringify(usersData),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
            
		}
		const data = await response.json()
		document.querySelector(".modal-body").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
            <div class="alert alert-success" role="alert">
                ${data.message}
            </div>
        </div> `
        return data // return the response data on console
	} catch (error) {
		console.log(error)
		throw error
	}
};   
    