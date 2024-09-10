
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from '../types/index';
import ErrorMesage from "./ErrorMesage";
import { useBudget } from "../hooks/useBudget";




export default function ExpenseForm() {

    const [expense, setexpense] = useState<DraftExpense>({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })

    const [error, seterror] = useState('')
    const [previousAmount, setpreviousAmount] = useState(0)
    const {dispatch, state, remainingBudget} = useBudget()

    useEffect(() => {
      if(state.editingId){
        const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId )[0]
        setexpense(editingExpense)
        setpreviousAmount(editingExpense.amount)
      }
    }, [state.editingId])
    

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const {name, value} = e.target
      const isAmountField = ['amount'].includes(name)
      setexpense({
        ...expense,
        [name] : isAmountField ? +value : value
      })
    }

    const handleChangeDate = (value: Value) => {
      setexpense({
        ...expense,
        date: value
      })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      //** Validar */
      if(Object.values(expense).includes('')){
        seterror('Todos los campos son obligatorios')
        return
      }

      // Validar que no me pase del limite 
      if((expense.amount - previousAmount ) > remainingBudget ){
        seterror('Presupuesto alcanzado')
        return
      }
      
      if(state.editingId){
        dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
      } else {
        dispatch({type: 'add-expense', payload: {expense}})

      }

      //Reiniciar el state
      setexpense({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
      }) 
      setpreviousAmount(0)

    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>
      {error && <ErrorMesage>{error}</ErrorMesage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre del Gasto:</label>
        <input 
          type="text" 
          id="expenseName" 
          placeholder="Añade el nombre del gasto" 
          className="bg-slate-100 p-2" 
          name="expenseName" 
          value={expense.expenseName}
          onChange={handleChange }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input 
          type="number" 
          id="amount" 
          placeholder="Añade la cantidad del gasto: ej: 300" 
          className="bg-slate-100 p-2" 
          name="amount" 
          onChange={handleChange}
          value={expense.amount}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">Categoría:</label>
        <select 
          id="category" 
          className="bg-slate-100 p-2" 
          name="category"
          onChange={handleChange }
          value={expense.category}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option 
              key={category.id} 
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Gecha Gasto:</label>
        <DatePicker 
            className='bg-slate-100 p-2 border-0'
            value={expense.date}
            onChange={handleChangeDate}
        />
      </div>
      </div>

      <input type="submit" className="bg-blue-600 uppercase cursor-pointer w-full p-2 text-white font-bold rounded-lg"
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}

      />


    </form>
  )
}
