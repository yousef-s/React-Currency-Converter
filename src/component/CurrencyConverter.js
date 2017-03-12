import React from 'react'

export const CurrencyConverterInput = (props) => {
  /**
   * Call setValue callback prop on change
   * @param  {Event} e Event
   */
  const onChange = (e) => {
    let value = e.target.value || 0
    props.setValue(value, props._instanceKey)
  }

  console.log(props)

  return (
    <div>
      <input type="text" value={props.value} onChange={onChange} />
    </div>
  )
}

export const CurrencyConverterMenu = (props) => {

}

/** Currency Converter React Component */
export default class CurrencyConverter extends React.Component { 
  constructor(props) {
    super(props)
    this.state = this.getInitialState(props)
  }

  /**
   * Get initial public state from props
   * @return {object} 
   */
  getInitialStateFromProps(props) {
    return {
      currencies: props.currencies,
      callback: props.callback
      // styles: props.styles
    }
  }

  /**
   * Get initial private state (cannot be modified by user props except for default currencies)
   * @return {object} State object to be stored children of state._private
   */
  getInitialStatePrivate(props) {
    return {
      exchangeRate: null,
      primaryInstance: {
        value: 100,
        currency: props.pair[0],
        _isInputSelected: true,
        _isInputListShown: false,
        _instanceKey: 'primaryInstance'
      },
      secondaryInstance: {
        value: 100,
        currency: props.pair[1],
        _isInputSelected: false,
        _isInputListShown: true,
        _instanceKey: 'secondaryInstance'
      },
      uiState: {
        _isAsyncRequest: true,
        _isAsyncRequestError: false
      }
    }
  }
  
  /**
   * Provide the initial state to the component.
   * @param  {object} props - Props passed into component.
   * @return {object} Object with component state, based on defaults and props.
   */
  getInitialState(props) {
    return Object.assign({}, this.getInitialStateFromProps(props), {_private: this.getInitialStatePrivate(props)})
  }

  getStatePrivate(key) {
    return this.state._private[key] || this.state._private
  }

  /**
   * Provide uniform access to functions which modify state.
   * @return {object} Object with functions as methods to modify state.
   */
  dispatchAction(actionKey) {
    /**
     * Abstraction to get new state for a child of state tree.
     * @param  {string} child  Key for child in state tree
     * @param  {object} update New state value
     * @return {object} New state assigned, with unmodified existing state
     */
    const getNewStateChild = (child, update, isHiddenCall = false) => {
      return {[child]: Object.assign({}, this.getStatePrivate(child), update)}
    }

    /**
     * Abstraction to set state of a private state member.
     * @param  {object}  update  New state value
     * @param  {}  child   Key for child in state tree if isChild is true
     * @param  {Boolean} isChild Does this update have children to apply
     */
    const setStatePrivate = (update, child, isChild = true) => {
      let newState = isChild === true ? getNewStateChild(child, update) : update
      this.setState({_private: Object.assign({}, this.state._private, newState)})
    }

    /**
     * Actions to be dispatched*, maps to state properties.
     * @type {Object}
     */
    const actions = {
      value: (value, instanceKey) => {
        setStatePrivate({value}, 'primaryInstance')
      }
    }

    // Bind the context of this component to the function returned
    return actions[actionKey].bind(this)
  }

  /**
   * [componentDidMount description]
   * @return {[type]} [description]
   */
  componentDidMount() {
  }

  /**
   * [componentWillUpdate description]
   * @return {[type]} [description]
   */
  componentWillUpdate() {

  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    console.log(this.state)
    // Slice of primaryInstance and secondaryInstance from state to destructure into children as props
    let { primaryInstance, secondaryInstance } = this.getStatePrivate()
    return (
      <div>
      <CurrencyConverterInput { ...primaryInstance } setValue={this.dispatchAction('value')}/>
      <CurrencyConverterInput { ...secondaryInstance } />
      </div>
    )
  }
}


/**
 * Default props for CurrencyConverter component
 */
CurrencyConverter.defaultProps = {
  currencies: ['AUD','BGN','BRL','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HRK','HUF','IDR','ILS','INR','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RUB','SEK','SGD','THB','TRY','USD','ZAR'],
  styles: {},
  callback: function (state) {

  },
  pair: ['USD', 'GBP']
}