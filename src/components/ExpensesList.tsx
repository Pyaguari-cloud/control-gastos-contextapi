import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpensesList = () => {

    const { state } = useBudget()
    
    const expenseByCategory = state.selectedCategory 
    ? state.expenses.filter(expense => expense.category === state.selectedCategory)
    : state.expenses
    
    const isEmpty = useMemo(() => expenseByCategory.length === 0, [expenseByCategory])

    return (
        <div className="mt-10 w-full bg-white rounded-lg shadow-lg p-5">
            {
                isEmpty ? <p className="text-2xl text-gray-600 font-bold ">No hay gastos</p> : (
                    <>
                        <p className="text-2xl text-gray-600 font-bold my-5">Listado de Gastos</p>
                        {
                            expenseByCategory.map(expense => (
                                <ExpenseDetail
                                    key={expense.id}
                                    expense={expense}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}
