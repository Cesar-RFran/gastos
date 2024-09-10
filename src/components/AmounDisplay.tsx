import { formatCurrency } from '../helpers/index';
type AmounDisplayProps = {
    label?: string,
    amount: number
}


export default function AmounDisplay({label, amount}: AmounDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}:`}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
