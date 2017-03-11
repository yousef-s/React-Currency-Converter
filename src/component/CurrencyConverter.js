import React from 'react'

// This should be rewritten as a functional component

export class CurrencyConverterInput extends React.Component {
  constructor(props) {
    super(props)
  }
  handleInputChange(e) {
    let value = e.target.value|| 0
    this.props.setStateValue(value, this.props.currencyMarker)
    //console.log(ref)
  }
  componentWillMount() {
  }
  render() {
    return (<div><input type="text" value={this.props.value} onChange={this.handleInputChange.bind(this)} /><ul>{this.props.currencyList.map((value, index) => <li key={index}>{value}</li>)}</ul></div>)
  }
}

export function CurrencyConverterMenu() {

}

// List will have event handler passed down through CurrencyConverter, which will dictate whether it's open or closed
// get it's selected value, etc

export default class CurrencyConverter extends React.Component {
  /* getInitialState()
   * @desc Provide initial state to the component
   * @return Object
   */
  
  getInitialState(props) {
    let state = {}
    // No mutations
    state._public = Object.assign({}, this.getInitialStatePublic(), props)
    state = Object.assign({}, state, this.getInitialStateProtected())

    return state
  }

  setter() {

    function getStateCurrencySelector() {
      let { primary, secondary } = this.state
      return {
        primary: primary.currency,
        secondary: secondary.currency
      }
    }

    function apply(selection, newStateSlice) {
      let slice = this.state[selection]
      let newState = {[selection]: newStateSlice}
      this.setState(newState)
    }

    return {
      rate: () => {
        let {primary, secondary} = this.getStateCurrencySelector()
        let url = `http://api.fixer.io/latest?base=${primary}&symbols=${secondary}`
        // Ideal promise structure
        fetch(url).then(res => res.json().rates[secondary]).then(rate => { this.setState({rate}) })
      },
      value: (value, selection) => {
        apply(selection, {value})
      },
      currency: (currency, selection) => {
        apply(selection, {currency})
      },
      isInputSelected: (selection) => {
        let alt = selection === 'primary' ? 'secondary' : selection
        this.setState({[selection]: Object.assign({}, slice, {isInputSelected: true})})
        this.setState({[alt]: Object.assign({}, slice, {isInputSelected: false})})
      },
      isInputListShown: () => {
        let alt = selection === 'primary' ? 'secondary' : primary
        this.setState({[alt]: Object.assign({}, slice, {isInputListShown: false})})
        // Toggle
        this.setState({[selection]: Object.assign({}, slice, {isInputListShown: !this.state[selection].isInputListShown})})
      }
    }
  }
  setStateRate(primaryCurrency, secondaryCurrency) {
    fetch(`http://api.fixer.io/latest?base=${primaryCurrency}&symbols=${secondaryCurrency}`).then(response => response.json()).then(json => { this.setState({ rate: json.rates[secondaryCurrency] })})
  }
  setStateValue(value, currencyMarker) {
    let stateSlice = this.state[currencyMarker]
    let newStateSlice = Object.assign({}, stateSlice, {
      value: value
    })
    this.setState({primary: newStateSlice})


  }
  constructor(props) {
    super(props)

    // Set user definable state props, merging against component props
    this.state = this.getInitialState()
    this.state._definable = Object.assign({}, {
        currencyList: ['AUD','BGN','BRL','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HRK','HUF','IDR','ILS','INR','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RUB','SEK','SGD','THB','TRY','USD','ZAR'],
        currencyDefaults: ['USD', 'GBP'],
        styles: null,
        seamless: true,
        getter: null
    }, props)

    // Set all protected state props
    this.state = Object.assign({}, this.state, {
      rate: null,
      primary: {
        currency: this.state._definable.currencyDefaults[0],
        value: 1000,
        _selected: true,
        _showList: false
      },
      secondary: {
        currency: this.state._definable.currencyDefaults[1],
        value: 0,
        _selected: false,
        _showList: false
      },
      _isFetching: false
    })
  }
  componentDidMount() {
    let { primary, secondary } = this.state._protected
    //this.setStateRate(primary.currency, secondary.currency)
    this.setter().rate()
  }
  render() {
    // Rewrite the ...Object.assign() call as use of spread operator
    return (
      <div>
      <CurrencyConverterInput {...Object.assign({}, this.state.primary, {currencyList: this.state._definable.currencyList, setStateValue: this.setStateValue.bind(this), currencyMarker: 'primary'}) } />
      <CurrencyConverterInput {...Object.assign({}, this.state.secondary, {currencyList: this.state._definable.currencyList})} />
      </div>
    )
  }
}