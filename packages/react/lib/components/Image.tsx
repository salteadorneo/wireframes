import styles from '../styles.module.css'

export function Image({
  width = 'auto',
  height = 'auto',
  aspectRatio = 1,
}: {
  width?: number | string,
  height?: number | string,
  aspectRatio?: number,
}) {
  return (
    <div
      className={`${styles.image}`}
      style={{
        width,
        height,
        aspectRatio,
      }} />
  )
}