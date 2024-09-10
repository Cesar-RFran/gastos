import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmounDisplay from "./AmounDisplay";
import  'react-circular-progressbar/dist/styles.css'



export default function BudgetTracker() {

    const {state, totalExpense, remainingBudget, dispatch} = useBudget()

    const percentage = +((totalExpense / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#048A10',
            trailColor: '#f5f6fa',
            textSize: 8,
            textColor: percentage === 100 ? '#DC2626' : '#048A10'
          })}
          text={`${percentage}% Gastado`}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button type="button" onClick={() => dispatch({type: 'reset-app'})} className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">Resetear App</button>
            <AmounDisplay 
            label='Presupuesto'
            amount= {state.budget}
            />

            <AmounDisplay 
            label='Disponible'
            amount= {remainingBudget}
            />

            <AmounDisplay 
            label='Gastado'
            amount= {totalExpense}
            />
        </div>
    </div>
  )
}
