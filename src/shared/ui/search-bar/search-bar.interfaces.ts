import { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'

interface ISearchBar extends InputHTMLAttributes<HTMLInputElement> {
  type?: string
  setValue: Dispatch<SetStateAction<string>>
  value: string
  btnText: string
  onActionDone: (param?: string) => Promise<void> | void
  btnDisabled?: boolean
  children?: ReactNode
  onResetSearch?: () => void
  listItems?: Array<{ title: string; id: string | number }>
}

export type { ISearchBar }
