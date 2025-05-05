import { FC, forwardRef, ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { Select } from '../select/Select';
import './CurrencyPicker.scss'

export interface InputProps {
  value?: string;
  disabled?: boolean;
  isClearEnable?: boolean;
  list: Record<string,string>;
  defaultItem:string;
  onInputChange: (value:string) => void;
  onSelectChange: (e:ChangeEvent<HTMLSelectElement>) => void;
}

export const CurrencyPicker: FC<InputProps> = forwardRef((props, ref) => {
  const {
    value,
    disabled = false,
    list,
    defaultItem,
    onInputChange,
    onSelectChange,
  } = props;

  return (
    <div className='currency-picker'>
      <IMaskInput
        mask={Number}
        scale={4}
        thousandsSeparator=" "
        normalizeZeros={true} 
        radix="."
        value={value}
        unmask={true}
        disabled={disabled}
        onAccept={(value) => onInputChange(value as string)}
        ref={ref}
        className='currency-picker_input'
      />
      <Select list={list} defaultItem={defaultItem} onChange={onSelectChange}/>
    </div>
  );
});


