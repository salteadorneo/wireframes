import styles from '../styles.module.css'

export function P({
    textAlign = 'left',
    children
}: {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    children: React.ReactNode
}) {
    return <p
        className={`${styles.p}`}
        style={{
            textAlign
        }}
    >
        {children}
    </p>
}