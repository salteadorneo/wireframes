import styles from '../styles.module.css'

export function Link({ text="Link", href="#" }: { text?: string, href?: string }) {
  return (
    <a
      href={href}
      className={`${styles.link}`}
    >
      {text}
    </a>
  )
}