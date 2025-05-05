import { ChangeEvent, FC, useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import debounce from 'lodash.debounce';
import { RootState } from "../../store/store"
import { chooseFrom, chooseTo } from "../../store/currencyConverterSlice"
import { CurrencyPicker } from "../currencyPicker/CurrencyPicker"
import { useGetRateQuery } from "../../store/currencyConverterApi"
import { isRateData } from "../../utils/supportiveFuncs"
import './CurrencyConverter.scss'

interface CurrencyConverterProps {
  list: Record<string, string>
}

export const CurrencyConverter: FC<CurrencyConverterProps> = (props) => {
  const { list } = props

  const dispatch = useDispatch()

  const from = useSelector((state: RootState) => state.currencyConverter.from)
  const to = useSelector((state: RootState) => state.currencyConverter.to)

  const [fromValue, setFromValue] = useState<string>('100')
  const [toValue, setToValue] = useState<string>('')
  
  const { data: rateData, isLoading } = useGetRateQuery({ from, to, amount:fromValue }) 

  const debouncedUpdateFromValue = useCallback(
    debounce((value: string) => {
      setFromValue(value)
    }, 500),
    []
  )

  useEffect(() => {
    if (isRateData(rateData) && to in rateData.rates) {
      const actualRate = rateData.rates[to]
      setToValue(String(actualRate))
    }
  }, [fromValue, toValue, rateData, to])

  useEffect(() => {
    return () => {
      debouncedUpdateFromValue.cancel()
    }
  }, [debouncedUpdateFromValue])

  function onChangeFrom(e: ChangeEvent<HTMLSelectElement>) {
    if(e.target.value === to){
      dispatch(chooseFrom(from))
      dispatch(chooseTo(e.target.value))
    }
    dispatch(chooseFrom(e.target.value))
  }

  function onChangeTo(e: ChangeEvent<HTMLSelectElement>) {
    if(e.target.value === from){
      dispatch(chooseFrom(to))
      dispatch(chooseTo(e.target.value))
    }
    dispatch(chooseTo(e.target.value))
  }

  function swapValues(){
    dispatch(chooseFrom(to))
    dispatch(chooseTo(from))
  }

  if(isLoading){
    return (
      <h1>Загрузка...</h1>
    )
  }

  return (
    <div className='wrapper'>
      <CurrencyPicker 
        value={fromValue}
        list={list}
        defaultItem={from} 
        onInputChange={(value)=>debouncedUpdateFromValue(value)}
        onSelectChange={onChangeFrom}
      />
      <img src='/assets/exchange.svg' className='img' onClick={swapValues}/>
      <CurrencyPicker 
        value={toValue}
        list={list}
        defaultItem={to} 
        onInputChange={() => {}}
        onSelectChange={onChangeTo}
        disabled
      />
    </div>
  )
}