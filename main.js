
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
// get total 
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result + ' DA';
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '0';
        total.style.background = 'red';
    }
}

//create product 
//problem of deleting in refreche
let dataPro;
if (localStorage.getItem('product')) {
    dataPro = JSON.parse(localStorage.getItem('product'));
}
else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
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
    if (mood === 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}
//clear inputs 
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData() {
    getTotal();
    let table = [];
    for (let i = 0; i < dataPro.length; i++) {
        table += `
           <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
        </tr>`;

    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeletAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDeletAll.innerHTML = `
  <button onclick = "deleteAll()">delete (${dataPro.length}) All</button>`
    }
    else {
        btnDeletAll.innerHTML = '';
    }

}
showData();

//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//delete ALL
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0)
    showData();
}
//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'Title';
    }
    else {
        searchMood = 'Category';
    }
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value = '';
    showData();
}
function searchData(value) {

    let table = '';
     for(let i = 0 ; i< dataPro.length ; i++){
    if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
           <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
        </tr>`;
            }
        
    } else {
        
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
           <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
        </tr>`;
            }
        
    }
    }
    document.getElementById('tbody').innerHTML = table;
}
//clean data 