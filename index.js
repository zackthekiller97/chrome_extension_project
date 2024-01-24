let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ulEl")
const inputBtn = document.getElementById("input-btn")
const leadstorage = JSON.parse(localStorage.getItem("myLeads"))
const deletebtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if (leadstorage) {
    myLeads = leadstorage
    renderLeads(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
    
})

deletebtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

function renderLeads(array) {
    let listItems = []
    for (let i = 0; i < array.length; i++) {
        listItems += `<li><a href="${array[i]}" target="_blank">${array[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}



