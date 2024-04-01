export function ZodErrors(props: { errors?: string[] }) {
  if (!props.errors?.length) return null
  let errs = []

  props.errors.map((err) => {
    errs.push(err)
  })

  return errs.map((err) => ({ message: err }))
}
