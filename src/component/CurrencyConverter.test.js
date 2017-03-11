import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import CurrencyConverter, { CurrencyConverterInput, CurrencyConverterMenu } from './CurrencyConverter'

describe('CurrencyConverter', () => {
  it('Public component state takes props as super definitive, and are as expected', () => {

  })

  it('Protected* component state is unaffected by props, as is expected', () => {

  })

  it('Two <CurrencyConverterInput> are the children of an instance of <CurrencyConverter>', () => {

  })

  it('At render, setter().rate() is called', () => {

  })

  it('When setter().rate() is called, state is updated as expected on success', () => {

  })

  it('When setter().rate() is called, state is updated as expected on error', () => {

  })

  it('When public state is changed, function passed as \'getter\' prop is called with expected args', () => {

  })
})

describe('CurrencyConverterInput', () => {
  it('Is a function', () => {

  })

  it('Has a only one <input type="text"> as a child', () => {

  })


  it('Props correctly map to the rendered <input> element', () => {

  })

  it('Expected callback is called onChange of the value', () => {

  })
})



describe('CurrencyConverterMenu', () => {
  it('It is a function', () => {

  })

  it('Has a single <ul>...</ul> as a child, with grand-children <li> equal to the length of the currency list', () => {

  })


  it('Props correctly map to the rendered <ul>...</ul> element', () => {

  })

  it('Expected callback is called onClick of the selected menu item', () => {

  })

  it('Expected callback is called onClicks of a inactive menu item', () => {

  })

  it('It is shown/hidden according to the relevant props passed', () => {

  })
})