import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
    const { state } = useBudget();

    // Filtrar gastos según la categoría actual
    const filterExpense = useMemo(() => {
        return state.currentCategory
            ? state.expenses.filter(expense => expense.category === state.currentCategory)
            : state.expenses;
    }, [state.expenses, state.currentCategory]);

    // Determinar si la lista de gastos está vacía
    const isEmpty = useMemo(() => filterExpense.length === 0, [filterExpense]);

    return (
        <div className="mt-10 bg-white shadow-lg p-10 rounded-lg">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    {filterExpense.map(expense => (
                        <ExpenseDetails
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
