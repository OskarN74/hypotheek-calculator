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
    this.app = document.querySelector('#app')
    this.flex = document.querySelector('#flex')
  }
  get input () {
    return {
      amount: this.amount.value,
      interest: this.interest.value,
      years: this.years.value
    }
  }
  showResults (r) {
    const rows = this.results.querySelectorAll('.row')
    rows.forEach(row => row.classList.remove('row--hidden'))
    this.monthlyPayment.innerHTML = r.monthly.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })
    this.totalPayment.innerHTML = r.total.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })
    this.totalInterest.innerHTML = r.interest.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })
  }
  resetResults () {
    const rows = this.results.querySelectorAll('.row')
    rows.forEach(row => row.classList.add('row--hidden'))
    this.monthlyPayment.innerHTML = ''
    this.totalPayment.innerHTML = ''
    this.totalInterest.innerHTML = ''
  }
  showError (e) {
    this.errorDiv.className = 'alert alert--danger'
    this.errorDiv.appendChild(document.createTextNode(e))
    this.app.insertBefore(this.errorDiv, this.flex)
    setTimeout(this.clearError, 3000)
  }
  clearError () {
    document.querySelector('.alert').remove()
  }
}
