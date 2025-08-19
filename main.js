const title = document.getElementById("title")
const price = document.getElementById("price")
const taxes = document.getElementById("taxes")
const ads = document.getElementById("ads")
const discount = document.getElementById("discount")
const total = document.getElementById("total")
const count = document.getElementById("count")
const category = document.getElementById("category")
const submit = document.getElementById("submit")
const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")
const body = document.body
let mood = "create"
let tmp
let dataPro
let searchMood = "title"

// get total
function getTotal() {
  if (price.value != "") {
    const result = +price.value + +taxes.value + +ads.value - +discount.value
    total.innerHTML = result + " DA"
    total.style.background = "#040"
  } else {
    total.innerHTML = "0"
    total.style.background = "red"
  }
}

//create product
//problem of deleting in refreche
if (localStorage.getItem("product")) {
  dataPro = JSON.parse(localStorage.getItem("product"))
} else {
  dataPro = []
}

submit.onclick = () => {
  const newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }
  //save in localstorage
  //count
  if (title.value != "" && price.value != "" && newPro.count < 100 && category.value != "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro)
        }
      } else {
        dataPro.push(newPro)
      }
    } else {
      dataPro[tmp] = newPro
      mood = "create"
      submit.innerHTML = "Create"
      count.style.display = "block"
    }
    clearData()
  }
  localStorage.setItem("product", JSON.stringify(dataPro))

  showData()
}
//clear inputs
function clearData() {
  title.value = ""
  price.value = ""
  taxes.value = ""
  ads.value = ""
  discount.value = ""
  total.innerHTML = ""
  count.value = ""
  category.value = ""
}
//read
function showData() {
  getTotal()
  let table = []
  for (let i = 0; i < dataPro.length; i++) {
    table += `
           <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
        </tr>`
  }
  document.getElementById("tbody").innerHTML = table
  const btnDeletAll = document.getElementById("deleteAll")
  if (dataPro.length > 0) {
    btnDeletAll.innerHTML = `
  <button onclick = "deleteAll()">delete (${dataPro.length}) All</button>`
  } else {
    btnDeletAll.innerHTML = ""
  }
}
showData()

//delete
function deleteData(i) {
  dataPro.splice(i, 1)
  localStorage.product = JSON.stringify(dataPro)
  showData()
}
//delete ALL
function deleteAll() {
  localStorage.clear()
  dataPro.splice(0)
  showData()
}

function updateData(i) {
  title.value = dataPro[i].title
  price.value = dataPro[i].price
  taxes.value = dataPro[i].taxes
  ads.value = dataPro[i].ads
  discount.value = dataPro[i].discount
  category.value = dataPro[i].category
  getTotal()
  count.style.display = "none"
  submit.innerHTML = "Update"
  mood = "update"
  tmp = i
  scroll({
    top: 0,
    behavior: "smooth",
  })
}

function getSearchMood(id) {
  const search = document.getElementById("search")
  if (id == "searchTitle") {
    searchMood = "title"
  } else {
    searchMood = "category"
  }
  search.placeholder = "Search By " + searchMood
  search.focus()
  search.value = ""
  showData()
}
function searchData(value) {
  let table = ""
  value = value.toLowerCase()  // normalize input
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value)) {
        table += createRow(i)
      }
    } else if (searchMood == "category") {
      if (dataPro[i].category.includes(value)) {
        table += createRow(i)
      }
    }
  }
  document.getElementById("tbody").innerHTML = table
}

function createRow(i) {
  return `
    <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
}


document.addEventListener("DOMContentLoaded", () => {
 
  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun"
    } else {
      themeIcon.className = "fas fa-moon"
    }
  }
})
