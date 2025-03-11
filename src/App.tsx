import { useEffect } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { BudgetTracker } from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpensesList } from "./components/ExpensesList"
import { useBudget } from "./hooks/useBudget"
import { FilterByCategory } from "./components/FilterByCategory"

export const App = () => {

  const { state } = useBudget()

  useEffect( () => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  },[state] )

  const isValidBudget = () => {
    return state.budget > 0
  }

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-4xl font-black text-white text-center uppercase">Planificador de Gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget() ? <BudgetTracker /> : <BudgetForm />}
      </div>


      {isValidBudget() && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ExpensesList />
          <ExpenseModal />

        </main>
      )}


    </>
  )
}
