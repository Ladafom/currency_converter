import { FC, ChangeEvent } from "react"
import './Select.scss'

interface SelectProps {
  list: Record<string,string>
  defaultItem: string
  onChange: (e:ChangeEvent<HTMLSelectElement>) => void
}

export const Select:FC<SelectProps> = (props) =>{

  const {
    list,
    defaultItem,
    onChange
  } = props

  return(
    <select name="select"
      value={defaultItem} 
      onChange={onChange}
      className='select'
    >
      {
        Object.keys(list).map((item)=>(
          <option 
            key={item}
            value={item}
            className="option"
          >
            {item}-{list[item]}
          </option>
        ))
      }
    </select>
  )
}