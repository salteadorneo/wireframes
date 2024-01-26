import styles from '../styles.module.css'

export function Video({
  width = 'auto',
  height = 'auto',
  aspectRatio = 16 / 9,
}: {
  width?: number | string,
  height?: number | string,
  aspectRatio?: number,
}) {
  return (
    <div
      className={`${styles.video}`}
      style={{
        width,
        height,
        aspectRatio,
      }} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth=".4"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
      </svg>
    </div>
  )
}