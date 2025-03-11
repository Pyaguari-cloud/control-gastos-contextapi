import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export const BudgetForm = () => {

    const [valor, setValor] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.valueAsNumber)
    }

    const isValid = useMemo(()=> {
        return isNaN(valor) || valor <= 0
    },[valor])


    const { dispatch } = useBudget()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:'add-budget', payload:{budget:valor}})
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl font-bold text-blue-600 text-center">
                    Define tu Presupuesto</label>
                <input
                    type="number"
                    id="budget"
                    name="budget"
                    className="w-full border border-slate-400 p-2 outline-blue-600"
                    placeholder="Ingresa tu presupuesto"
                    value={valor}
                    onChange={handleChange}
                    />
            </div>

            <input
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 w-full p-2 font-black text-white uppercase 
                cursor-pointer disabled:opacity-40"
                disabled={isValid}
                value="Definir presupuesto" />
        </form>
    )
}
