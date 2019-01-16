export class HypotheekCalculator {
  constructor (input) {
    this.amount = input.amount
    this.interest = input.interest
    this.years = input.years
  }
  calculations () {
    const principal = parseFloat(this.amount)
    const calculatedInterest = parseFloat(this.interest) / 100 / 12
    const calculatedPayments = parseFloat(this.years) * 12
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)
    if (isFinite(monthly)) {
      return {
        monthly: +monthly.toFixed(2),
        total: +(monthly * calculatedPayments).toFixed(2),
        interest: +((monthly * calculatedPayments) - principal).toFixed(2)
      }
    } else {
      return new Error('Controleer de ingevoerde getallen, er ging iets mis!')
    }
  }
}
