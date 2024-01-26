import styles from '../styles.module.css'

export function Flex({ children }: { children: React.ReactNode }) {
    return <div className={`${styles.flex}`}>{children}</div>
}

export function Grid({ children }: { children: React.ReactNode }) {
    return <div className={`${styles.grid}`}>{children}</div>
}