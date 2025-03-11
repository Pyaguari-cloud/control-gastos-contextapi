import { useReducer, ActionDispatch, createContext, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

export type BudgetContextProps = {
    state: BudgetState
    dispatch: ActionDispatch<[action: BudgetActions]>
    gastado: number
    disponible: number
}

export type BudgetProviderProps = {
    children: ReactNode
}


export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const gastado = useMemo( ()=> state.expenses.reduce((total,expense)=> expense.expenseAmount + total,0 ),[state.expenses] )
    const disponible = state.budget - gastado

    return (
        <BudgetContext.Provider
            value={{
                state, dispatch, gastado, disponible
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}
