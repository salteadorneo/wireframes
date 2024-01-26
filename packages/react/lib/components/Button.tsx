import styles from '../styles.module.css'

export function Button({
  backgroundColor = 'white',
  color = 'black',
  borderColor = 'black',
  children = 'Button',
}: {
  backgroundColor?: string,
  color?: string,
  borderColor?: string,
  children?: React.ReactNode
}) {
  return (
    <button
      className={`${styles.button}`}
      style={{
        backgroundColor,
        color,
        borderColor
      }}
    >
      {children}
    </button>
  )
}