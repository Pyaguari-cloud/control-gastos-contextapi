import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
  expense: Expense
}


export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {

  const {dispatch} = useBudget()

  const category = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
      onClick={()=> dispatch({ type: 'get-expense-id', payload: {id:expense.id} })}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
      onClick={()=> {dispatch({type:"remove-expense", payload: {id:expense.id}})}}
      destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg w-full p-10 border-b border-gray-200 flex gap-3 items-center">
          <div>
            <img src={`/icono_${category.icon}.svg`} alt="icono de gasto"
              className="w-20" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-slate-500 uppercase text-sm font-bold">{category.name}</p>
            <p >{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay
            amount={expense.expenseAmount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
