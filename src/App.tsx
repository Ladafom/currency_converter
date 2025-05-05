import { useGetAllCurrenciesQuery } from "./store/currencyConverterApi"
import { CurrencyConverter } from "./components/currencyConverter/CurrencyConverter"

function App() {

  const {data = {}} = useGetAllCurrenciesQuery()

  return (
    <>
      <CurrencyConverter list={data}/>
    </>
  )
}

export default App
