import React from 'react'
import { render } from 'react-dom'

import CurrencyConverter from './component/CurrencyConverter'

render(<CurrencyConverter currencyDefaults={['GBP', 'EUR']} />, document.getElementById('app'))