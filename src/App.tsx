import { useEffect, useState } from "react"
import { getAllCurrencies } from "./utils/api"
import { CurrencyConverter } from "./components/currencyConverter/CurrencyConverter"

function App() {

  const [allCurrencies, setAllCurrencies] = useState({})

  useEffect(()=>{
    getAllCurrencies().then(res=>{
      setAllCurrencies(res)
    })
  },[])

  return (
    <>
      <CurrencyConverter list={allCurrencies}/>
    </>
  )
}

export default App
