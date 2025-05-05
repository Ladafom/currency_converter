import { ChangeEvent, FC, useEffect, useState, useCallback } from "react"
import debounce from 'lodash.debounce';
import { CurrencyPicker } from "../currencyPicker/CurrencyPicker"
import { getRate } from "../../utils/api";
import './CurrencyConverter.scss'

interface CurrencyConverterProps {
  list: Record<string, string>
}

export const CurrencyConverter: FC<CurrencyConverterProps> = (props) => {
  const { list } = props

  const [fromValue, setFromValue] = useState<string>('100')
  const [toValue, setToValue] = useState<string>('')
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('EUR')

  const debouncedUpdateFromValue = useCallback(
    debounce((value: string) => {
      setFromValue(value)
    }, 500),
    []
  )

  useEffect(() => {
    getRate(fromCurrency, toCurrency, fromValue).then(res=>{
      setToValue(String(res.rates[toCurrency]))
    })
  }, [fromValue, toValue, toCurrency])

  useEffect(() => {
    return () => {
      debouncedUpdateFromValue.cancel()
    }
  }, [debouncedUpdateFromValue])

  function onChangeFrom(e: ChangeEvent<HTMLSelectElement>) {
    if(e.target.value === toCurrency){
      setToCurrency(fromCurrency)
      setFromCurrency(e.target.value)
    }
    setFromCurrency(e.target.value)
  }

  function onChangeTo(e: ChangeEvent<HTMLSelectElement>) {
    if(e.target.value === fromCurrency){
      setFromCurrency(toCurrency)
      setToCurrency(e.target.value)
    }
    setToCurrency(e.target.value)
  }

  function swapValues(){
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }


  return (
    <div className='wrapper'>
      <CurrencyPicker 
        value={fromValue}
        list={list}
        defaultItem={fromCurrency} 
        onInputChange={(value)=>debouncedUpdateFromValue(value)}
        onSelectChange={onChangeFrom}
      />
      <img src='./assets/exchange.svg' className='img' onClick={swapValues}/>
      <CurrencyPicker 
        value={toValue}
        list={list}
        defaultItem={toCurrency} 
        onInputChange={() => {}}
        onSelectChange={onChangeTo}
        disabled
      />
    </div>
  )
}