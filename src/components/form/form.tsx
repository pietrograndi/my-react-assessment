import React, { useState } from "react"
import { useDebouncedCallback } from 'use-debounce';
import { FormWrapper } from "./form.style"

interface FormProps {
  currentUsername: string
  userList: string[]
  disabled: boolean
  onSubmit: () => void
  updateName: (name:string) => void
  pushNotify: (name:string) => void
} 


export const Form = (p: FormProps) => {
  const [inputValue, setInputValue] = useState(p.currentUsername)
  const updateValue = (name: string) => {
    setInputValue(name)
    debounced(name)
  }
  const debounced = useDebouncedCallback((name:string) => {
    p.updateName(name)
  }, 400)

  const handleButtonClick = (e:React.SyntheticEvent) => {
    e.preventDefault()
    p.onSubmit()
  }

  return <FormWrapper >
    <form onSubmit={handleButtonClick} data-testid="form">
      <fieldset>
        <input  type="text" data-testid="input" onChange={e => updateValue(e.target.value)} value={inputValue} placeholder="inserisci un nome utente" />
        <button type="submit" data-testid="submit" disabled={inputValue === '' || p.disabled}>salva</button>
      </fieldset>
    </form>
  </FormWrapper>
}