import { HypotheekCalculator } from './hypotheek-calculator'
import { UI } from './ui'
import '../css/style.css'

const App = (() => {
  // Event listeners
  const loadEventListeners = () => {
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
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
              // Registration was successful
              console.log('ServiceWorker registration successful with scope: ', registration.scope)
            }, function (err) {
              // registration failed :(
              console.log('ServiceWorker registration failed: ', err)
            })
        })
      }
      loadEventListeners()
    }
  }
})()

App.init()
