import { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'

interface ISearchBar extends InputHTMLAttributes<HTMLInputElement> {
  type?: string
  setValue: Dispatch<SetStateAction<string>>
  value: string
  btnText: string
  btnDisabled?: boolean
  children?: ReactNode
}

export type { ISearchBar }
