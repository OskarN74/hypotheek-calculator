import { HypotheekCalculator } from './hypotheek-calculator'
import { UI } from './ui'
import '../css/style.css'

const App = (() => {
  // Event listeners
  const loadEventListeners = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
      })
    }
    document.getElementById('loan-form').addEventListener('submit', doCalculations)
  }

  // get calculations and show results
  const doCalculations = (e) => {
    // get UI methods and elements
    const ui = new UI()
    // calculate using the inputted values
    const hypotheek = new HypotheekCalculator(ui.input)
    const results = hypotheek.calculations()

    // handle results
    if (results.message) {
      // show error in the UI
      ui.resetResults()
      ui.showError(results.message)
    } else {
      // display the results in the UI
      ui.showResults(results)
    }
    e.preventDefault()
  }

  return {
    init () {
      loadEventListeners()
    }
  }
})()

App.init()
