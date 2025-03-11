import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'selected-category', payload: {category:e.target.value}})
    }
    return (
        <div className="mt-5 w-full bg-white rounded-lg shadow-lg p-10">
            <form >
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <label className="font-bold text-slate-600" htmlFor="category">Filtro:</label>
                    <select
                        id="category"
                        className="flex-1 bg-slate-100 p-2 rounded-lg"
                        onChange={handleChange}
                    >
                        <option value="">-- Todas las categorías --</option>
                        {
                            categories.map(category => (
                                <option value={category.id} key={category.id}> {category.name} </option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}
