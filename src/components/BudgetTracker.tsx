import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import 'react-circular-progressbar/dist/styles.css'

export const BudgetTracker = () => {

    const { state, gastado, disponible, dispatch } = useBudget()
    
    const percentage = +((gastado / state.budget) * 100).toFixed(2)
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar 
                value={percentage}
                styles={buildStyles({
                    pathColor:  `${percentage === 100 ? '#ef233c' : '#4361ee'}`,
                    trailColor: '#eaf4f4',
                    textSize: 8,
                    textColor: `${percentage === 100 ? '#ef233c' : '#4361ee'}`,
                    
                })}
                text={`${percentage}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 font-bold w-full text-white uppercase p-2 rounded-lg cursor-pointer"
                    onClick={()=> dispatch({type:'reset-expenses'})}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={disponible}
                />

                <AmountDisplay
                    label="Gastado"
                    amount={gastado}
                />
            </div>
        </div>
    )
}
