let addBtn = document.querySelector(".add-btn");
let input = document.querySelector("input");
let ul = document.querySelector("ul");

let updatePage = (val, id) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Delete";
    removeBtn.addEventListener("click", (evt) => removeList(evt, id));
    p.innerText = val;
    li.setAttribute("data-id", id); // Add a data attribute with the ID
    ul.append(li);
    li.append(p);
    li.append(removeBtn);
    input.value = "";
}

let removeList = (evt, id) => {
    if (confirm("Are you sure you want to delete this item?")) {
        let getItems = JSON.parse(localStorage.getItem("Todo_List"));
        getItems = getItems.filter(item => item.id !== id);
        localStorage.setItem("Todo_List", JSON.stringify(getItems));
        evt.target.parentNode.remove();
    }
}

let getDataLS = () => {
    if (localStorage.getItem("Todo_List")) {
        let getList = JSON.parse(localStorage.getItem("Todo_List"));
        for (let item of getList) {
            updatePage(item.value, item.id);
        }
    }
}

let addDataLS = () => {
    let id = Date.now(); // Generate a unique ID based on the current timestamp
    let item = { value: input.value, id: id };

    if (localStorage.getItem("Todo_List")) {
        let getItems = JSON.parse(localStorage.getItem("Todo_List"));
        getItems.push(item);
        localStorage.setItem("Todo_List", JSON.stringify(getItems));
    } else {
        localStorage.setItem("Todo_List", JSON.stringify([item]));
    }
}

addBtn.addEventListener("click", (evt) => {
    if (input.value.trim().length !== 0) {
        addDataLS();
        updatePage(input.value, Date.now()); // Use a new ID for the added item
    }
})

// Initialize the page with existing items
getDataLS();
