const bill = document.querySelector('#bill')
const tip = document.querySelectorAll('.tip-option')
const custom = document.querySelector('#custom-tip')
const numberP = document.querySelector('.numberP')
const amount = document.querySelector('.amount')
const total = document.querySelector('#total')
const reset = document.querySelector('.reset')
const span = document.querySelectorAll('span')
reset.addEventListener('click', resetar)
custom.addEventListener('click', removerTipValue)
numberP.addEventListener("blur", calcular)
bill.addEventListener("blur", function(){
  if(bill.value == ""){
    bill.classList.add('error')
    span[0].style.display = 'inline'
  }else{
    bill.classList.remove('error')
    span[0].style.display = 'none'
  }
})

let tipValue = 0

tip.forEach((item , i)=>{
  item.addEventListener('click', selectTip)
  function selectTip(){
    tip.forEach(item =>{
      if(item.classList.contains('selected')){
      item.classList.remove('selected')
      }
    })
    tipValue = Number(item.firstElementChild.value)
    console.log(tipValue)
    item.classList.add('selected')
  }
})

function removerTipValue(){
  tip.forEach(item =>{item.classList.remove('selected')})
}

function calcular(){
  let billV = Number(bill.value)
  if(custom.value != ''){
    let customV = Number(custom.value)
    tipValue = customV
  }
  let numberPV = Number(numberP.value)
  let calcAmount = ((billV * tipValue) / 100) / numberPV
  let calcTotal = (billV / numberPV) + calcAmount
  let dollarUSLocale = Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: 3
  })
  if(numberP.value == ''){
    amount.innerHTML = "$0,00"
    numberP.classList.add('error')
    span[1].style.display = 'inline'
  }else{
    amount.innerHTML = dollarUSLocale.format(calcAmount)
    total.innerHTML = dollarUSLocale.format(calcTotal)
    numberP.classList.remove('error')
    span[1].style.display = 'none'
  }
}

function resetar(){
  bill.value = ""
  numberP.value = ""
  tip.forEach(item =>{item.classList.remove('selected')})
  custom.value = ""
  amount.innerHTML = "$0.00"
  total.innerHTML = "$0.00"
}