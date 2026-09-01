import { Pencil } from 'lucide-react'

/**
 * Shows the address the signup flow is using, with a way back to change it.
 */
const EditableEmail = ({ email, onEdit, className = '' }) => {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <p className="min-w-0 break-all text-sm font-bold leading-[22px] tracking-normal text-black">
        {email}
      </p>

      <button
        type="button"
        onClick={() => onEdit?.()}
        className="flex shrink-0 items-center gap-2 rounded-lg bg-[#FFECE0] px-3 py-1.5 text-sm font-bold text-[#F36A0E] transition-colors hover:bg-[#FFE2D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>
    </div>
  )
}

export default EditableEmail
