import { baseUrl } from "./apiUrl";

export async function getAllCurrencies(){
  let res = await fetch(`${baseUrl}/currencies`)
  return await res.json()
}

export async function getRate(from:string,to:string,amount:string){
  let res = await fetch(`${baseUrl}/latest?base=${from}&symbols=${to}&amount=${amount}`)
  return await res.json()
}