import styles from '../styles.module.css'

export function Avatar({ size = 64 }: { size?: number }) {
  return (
    <div
      className={`${styles.avatar}`}
      style={{
        width: size,
        height: size,
      }}
    />
  )
}