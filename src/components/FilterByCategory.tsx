import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";



export default function FilterByCategory() {

    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'add-filter-category', payload: {id: e.target.value} })
    }

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <form action="" className="flex items-center gap-4">
        <label 
          htmlFor="category" 
          className="font-semibold text-gray-700"
        >
          Filtrar Gastos
        </label>
        <select 
          id="category"
          className="bg-slate-100 p-3 rounded border border-gray-300 shadow-sm flex-1"
          onChange={handleChange}
        >
          <option value="">-- Todas las categorías --</option>
          {categories.map(category => (
            <option 
              value={category.id}
              key={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
