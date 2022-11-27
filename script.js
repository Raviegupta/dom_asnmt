const gadgetForm = document.getElementById('gadget_form');
const deleteButton = document.getElementById('delete_btn');
const displayItem = document.getElementById('display_item');

const categoryFilter = document.getElementById('category_filter');
let currentFilter = "";
let gadgetArr = JSON.parse(localStorage.getItem("gadget"));

if (!gadgetArr) {
  gadgetArr = [];
}

display(gadgetArr);

categoryFilter.addEventListener("click", (e) => {
  e.preventDefault();
  currentFilter = e.target.innerText;

  let filterCategory = gadgetArr;

  if (currentFilter === "Headphones") {
    filter = filterCategory.filter((item) => item.gadgetCategpry === "headphone");
  } else if (currentFilter === "Laptops") {
    filter = filterCategory.filter((item) => item.gadgetCategpry === "laptop");
  } else if (currentFilter === "Mobiles") {
    filter = filterCategory.filter((item) => item.gadgetCategpry === "Mobile");
  }

  if (currentFilter === "All") {
    display(gadgetArr);
  } else {
    display(filter);
  }
});

gadgetForm.addEventListener('submit', (e) => {
  // e.preventDefault();  
  let imageUrl = e.target.image_url.value;
  let gadgetCategpry = e.target.gadget_category.value;
  gadgetArr.push({ imageUrl, gadgetCategpry, id: Date.now() });
  localStorage.setItem("gadget", JSON.stringify(gadgetArr))
  console.log(gadgetArr)
  imageUrl = "";
  gadgetCategpry = "";
  e.target.image_url.value = "";
  display(gadgetArr);
})


function display(gadgetArr) {
  const displayItem = document.getElementById('display_item');
  displayItem.innerHTML = "";
  if (!gadgetArr) return;
  gadgetArr.map((val) => displayItem.innerHTML += (`<div><img id="${val.id}" class="image" src="${val.imageUrl}" alt="image loading..."> <br><br><button class="delete_btn">Delete</button><div>`))
}

todoList.addEventListener('click', (e) => {
  let todoItem = e.target;
  let toDoId = e.target.id;
  todoItem.classList.toggle("checked");
  toDoItems.forEach((val) => {
    if (val.id == toDoId) {
      val.checked = !val.checked;
    }
  })
  localStorage.setItem("todo", JSON.stringify(toDoItems));
})

displayItem.addEventListener('mouseover', () => {
  const delete_row = document.querySelectorAll('.delete_btn');
  console.log(delete_row);
  for (let i = 0; i < delete_row.length; i++) {
    delete_row[i].addEventListener('click', function () {
      this.parentNode.remove();
      gadgetArr.splice(i, 1);
      localStorage.setItem("gadget", JSON.stringify(gadgetArr));
    })
  }
})

