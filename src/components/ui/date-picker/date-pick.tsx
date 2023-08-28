import { ChangeEvent, ReactNode, useState } from 'react'

import DatePicker, { DateObject } from 'react-multi-date-picker'

import DateIconDefault from '@/src/assets/icons/date-icon-default'
import s from '@/src/components/ui/date-picker/date-picker.module.scss'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { Typography } from '@/src/components/ui/typography'

/**
 in onChange callback you get DateObject value , you can destruct from object values
 example:
 const { year, month, day, hour, minute } = value
 *
 */

type DatePickPropsType = {
  label?: string
  onChange?: (value: DateObject | DateObject[] | null) => void
  multiple?: boolean
  range?: boolean
  disabled?: boolean
  error?: string
}
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const DatePick = ({
  error,
  label,
  multiple,
  onChange,
  range,
  disabled,
}: DatePickPropsType) => {
  const [value, setValue] = useState<DateObject>(new DateObject())

  const onChangeInput = (value: any) => {
    // const { year, month, day, hour, minute } = value
    // console.log(year, 'month: ' + month.name, 'day: ' + day, 'hour: ' + hour, 'minute: ' + minute)
    setValue(value)
    onChange?.(value)
  }
  // TODO multiple dates from input

  return (
    <>
      <Typography variant={'regular14'} color={'secondary'}>
        {label}
      </Typography>
      <DatePicker
        className={s.calendar}
        containerClassName={s.container}
        render={
          <DateInput
            value={value}
            onChange={onChangeInput}
            onFocus={''}
            // TODO onfocus
            disabled={disabled!}
            error={!!error}
          />
        }
        weekDays={weekDays}
        weekStartDayIndex={1}
        showOtherDays
        placeholder="00.00.00"
        arrow={false}
        inputClass={s.input}
        range={range}
        dateSeparator=" - "
        monthYearSeparator=" "
        rangeHover
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        multiple={multiple}
        format={'DD/MM/YYYY'}
        value={value}
        onChange={onChangeInput}
        mapDays={({ date }) => {
          let props = {
            className: '',
          }
          let isWeekend = [5, 6].includes(date.weekDay.index)

          if (isWeekend) props.className = 'weekend'

          return props
        }}
      />
    </>
  )
}
type DateInputPropsType = {
  onFocus: any
  value: any
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  error: boolean
}
export const DateInput = ({ onFocus, value, onChange, disabled, error }: DateInputPropsType) => {
  const [icon, setIcon] = useState<ReactNode>(<DateIconDefault fill={error ? 'red' : 'white'} />)

  // TODO change icon on active
  return (
    <div className={s.inputContainer}>
      <input
        disabled={disabled}
        className={s.input}
        onFocus={onFocus}
        value={value}
        onChange={e => onChange(e)}
      />
      <div className={s.inputIcon}>{icon}</div>
    </div>
  )
}
