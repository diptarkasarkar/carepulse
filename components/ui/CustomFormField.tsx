'use client'
import React from 'react'
import {FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from '../Forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './select'
import { Textarea } from './textarea'
import { Checkbox } from './checkbox'
interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    lable?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?:  React.ReactNode,
    renderSkeleton?: (Field:any) => React.ReactNode,
}

const RenderField = ({field,props} :{field: any; props: CustomProps} ) => {
    const {fieldType, iconSrc,iconAlt,placeholder,showTimeSelect,dateFormat,renderSkeleton} = props;
    switch (fieldType) {
     
      case FormFieldType.CHECKBOX:
        return(
          <FormControl>
            <div className='flex items-center gap-4'>
              <Checkbox 
              id={props.name} 
              checked={field.value}
              onCheckedChange={field.onChange}
              />
              <label htmlFor={props.name} className='checkbox-lable'>
                {props.lable}
              </label>
            </div>
          </FormControl>
        )

      case FormFieldType.TEXTAREA:
        return(
          <FormControl>
            <Textarea placeholder = {placeholder}
            {...field}
            className='shad-textArea'
            disabled={props.disabled}
            /> 
            
          </FormControl>
        )

      case FormFieldType.INPUT:
     return(
      <div className="flex rounded-md border border-dark-500 bg-dark-400">
        {iconSrc && (
          <Image 
          src={iconSrc}
          height={24}
          width={24}
          alt='iconALT || ICON'
          className='ml-2'
          />
        )}
        <FormControl>
          <input placeholder={placeholder}
          {...field}
          className='shad-input border-0'
          />
        </FormControl>
      </div>
     )
     case FormFieldType.PHONE_INPUT:
       return(
          <FormControl>
            <PhoneInput 
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            classname="input-phone"
            />
          </FormControl>
        )
       case FormFieldType.DATE_PICKER:
        return(
          <div className='flex rounded-md border border-dark-500 bg-dark-400'>
              <img
               src="/assets/icons/calendar.svg"
               height={24}
               width={24}
               alt="calender"
               className='ml-2' 
              />
              <FormControl>
                <DatePicker 
                 selected={field.value} 
                 onChange={(date) => field.onChange(date)} 
                 dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                 showTimeSelect={showTimeSelect ?? false}
                 timeInputLabel='Time:'
                 wrapperClassName='date-picker'
                />
              </FormControl>
          </div>
        )

        case FormFieldType.SELECT:
          return(
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='shad-select-trigger'>
                    <SelectValue placeholder={placeholder}/>
                  </SelectTrigger>
                </FormControl>
               <SelectContent className='shad-select-content' >
                  {props.children}
               </SelectContent>
              </Select>
            </FormControl>
          )

       case FormFieldType.SKELETON:
        return renderSkeleton ? renderSkeleton
        (field):null
        
       default:
       break;
    }
}

const CustomFormField = (props: CustomProps) => {
  const{control,fieldType,name,lable } = props;
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
             {fieldType !== FormFieldType.CHECKBOX && lable &&(
                <FormLabel>{lable}</FormLabel>
             )}
              <RenderField field={field} props={props}/>
              <FormMessage className="shad-error"/>
            </FormItem>
          )}
        />
    )
}

export default CustomFormField