const headingEl = document.getElementById('heading')
const inputDescEl = document.querySelector('#inputDesc')
const inputElement = document.querySelector('#inputAmount')
const element = document.getElementById('btn')
const expenseTableEl = document.querySelector('#expenseTable')

let totalExpenses = 0 
let allExpenses = []

function addExpenseToTotal(){
    const expenseItems = {}

    totalExpenses = totalExpenses  + Number(inputElement.value )
    heading(totalExpenses)

    expenseItems.desc = inputDescEl.value
    expenseItems.amount = Number(inputElement.value)
    expenseItems.moment = new Date()
    allExpenses.push(expenseItems)
    
    renderListItem(allExpenses)
    document.querySelector('#inputAmount').value = ''
    document.querySelector('#inputDesc').value = ''
}

function currentDate(moment){
    let option = {month:'long', day:'numeric', year: 'numeric' }
    return moment.toLocaleDateString('un-Us', option)
}

function heading(expense){
return headingEl.textContent = `Total : ${expense}`
}

function deleteItem(deleteValue){
    let newArr = []
    totalExpenses = 0

    for(let i = 0; i < allExpenses.length; i++){
        if (allExpenses[i].moment.valueOf() !== deleteValue) {
            totalExpenses = allExpenses[i].amount + totalExpenses
            newArr.push(allExpenses[i])
        }
    }

    allExpenses = newArr 
    heading(totalExpenses)
    renderListItem(allExpenses)
}

function renderListItem(listArr){
    const allExpensesHTML = listArr.map(item => createListItem(item))
    const joinedtallExpensesHTML = allExpensesHTML.join('')
    expenseTableEl.innerHTML = joinedtallExpensesHTML
}

function createListItem({desc, amount, moment}){
    return `
    <li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
         ${desc}
            <small class="text-muted">${currentDate(moment)}</small>
        </div>
        <div>
        <span class="px-5">
         ${amount}
        </span>
        <button onclick='deleteItem(${moment.valueOf()})' class="btn btn-outline-danger btn-sm">
            <i class="fas fa-trash-alt"></i>
        </button>
        </div>
    </li>    
    `
}

element.addEventListener('click', addExpenseToTotal, false)