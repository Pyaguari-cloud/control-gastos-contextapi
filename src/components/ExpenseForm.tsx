import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    expenseAmount: 0,
    category: '',
    date: new Date()
  })

  const [lastAmount, setLastAmount] = useState(0)

  const [error, setError] = useState('')

  const { dispatch, state, disponible } = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setLastAmount(editingExpense.expenseAmount)
    }
  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    const isNumberField = ['expenseAmount'].includes(name)
    setExpense({
      ...expense,
      [name]: isNumberField ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validar que no hayan valores vacios
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }
    
    //validar que el gasto no sea mayor al presupuesto disponible
    if(( expense.expenseAmount - lastAmount) > disponible){
      setError('El gasto sobrepasa el presupuesto disponible')
      return
    }

    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }
    setExpense({
      expenseName: '',
      expenseAmount: 0,
      category: '',
      date: new Date()
    })
    setLastAmount(0)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-600 p-2">
        {
          state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'
        }

      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre gasto:
        </label>
        <input
          placeholder="Añade el nombre del gasto"
          type="text" id="expenseName" name="expenseName" className="w-full p-2 bg-slate-100"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseAmount" className="text-xl">
          Cantidad:
        </label>
        <input
          placeholder="Añade la cantidad del gasto"
          type="number" id="expenseAmount" name="expenseAmount" className="w-full p-2 bg-slate-100"
          value={expense.expenseAmount}
          onChange={handleChange}
        />
      </div>


      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categorías:
        </label>
        <select name="category" id="category" className="w-full p-2 bg-slate-100"
          value={expense.category} onChange={handleChange}>
          <option value="">--- Selecciona una categoría ---</option>
          {
            categories.map(cat => (
              <option value={cat.id} key={cat.id}>{cat.name}</option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className={'w-full bg-slate-100 p-2 border-0'}
          value={expense.date}
          onChange={handleChangeDate}
        />

      </div>

      <input type="submit" value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
        className="w-full bg-blue-600 p-2 uppercase font-bold text-white rounded-lg cursor-pointer"
      />
    </form>
  )
}
