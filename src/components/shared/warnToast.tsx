import {toast} from 'sonner'

import {Icons} from './icons'

const warnToast = (text: string) =>
  toast.custom(
    (t) => (
      <div className="flex items-center space-x-2 rounded-md border-orange-500/90 bg-yellow-200/90 p-5 text-sm shadow-md">
        <Icons.alertTriangle className="h-full w-6" />
        <div>{text}</div>
        <button
          onClick={() => toast.dismiss(t)}
          className="h-fit self-start rounded-full border border-black px-3 py-1.5"
        >
          X
        </button>
      </div>
    ),
    {duration: 6000}
  )

export default warnToast
