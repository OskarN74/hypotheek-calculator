export class UI {
  constructor () {
    // input
    this.amount = document.getElementById('amount')
    this.interest = document.getElementById('interest')
    this.years = document.getElementById('years')
    // output
    this.results = document.getElementById('results')
    this.monthlyPayment = document.getElementById('monthly-payment')
    this.totalPayment = document.getElementById('total-payment')
    this.totalInterest = document.getElementById('total-interest')
    // error related
    this.errorDiv = document.createElement('div')
    this.card = document.querySelector('.container')
    this.loanForm = document.querySelector('#loan-form')
  }
  get input () {
    return {
      amount: this.amount.value,
      interest: this.interest.value,
      years: this.years.value
    }
  }
  showResults (r) {
    this.results.style.display = 'block'
    this.monthlyPayment.value = r.monthly
    this.totalPayment.value = r.total
    this.totalInterest.value = r.interest
  }
  resetResults () {
    this.results.style.display = 'none'
    this.monthlyPayment.value = ''
    this.totalPayment.value = ''
    this.totalInterest.value = ''
  }
  showError (e) {
    this.errorDiv.className = 'alert alert-danger'
    this.errorDiv.appendChild(document.createTextNode(e))
    this.card.insertBefore(this.errorDiv, this.loanForm)
    setTimeout(this.clearError, 3000)
  }
  clearError () {
    document.querySelector('.alert').remove()
  }
}
