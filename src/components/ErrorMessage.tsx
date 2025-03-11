import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export const ErrorMessage = ({children}:ErrorMessageProps) => {
  return (
    <p className="w-full bg-red-600 text-white uppercase p-2 font-bold text-center">
        {children}
    </p>
  )
}
