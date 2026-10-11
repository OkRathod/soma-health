/**
 * Class overrides that turn the shared `DialogContent` into a bottom sheet on
 * phones while keeping the centred dialog from `sm` up. Used by the add and
 * edit deadline dialogs.
 */
export const deadlineSheetClass = [
  "gap-0 p-6 sm:max-w-md",
  "max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0",
  "max-sm:max-w-none max-sm:max-h-[90dvh] max-sm:rounded-b-none max-sm:rounded-t-[2rem] max-sm:border-x-0 max-sm:border-b-0",
  "max-sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]",
  "max-sm:data-[state=open]:zoom-in-100 max-sm:data-[state=closed]:zoom-out-100",
  "max-sm:data-[state=open]:slide-in-from-bottom-10 max-sm:data-[state=closed]:slide-out-to-bottom-10",
].join(" ");
