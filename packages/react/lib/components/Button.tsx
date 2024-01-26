import styles from '../styles.module.css'

export function Button({
  text = 'Button'
}: {
  text?: string
}) {
  return (
    <button className={`${styles.button}`}>
      {text}
    </button>
  )
}