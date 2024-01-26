import styles from '../styles.module.css'

export function Flex({
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    gap = 0,
    children
}: {
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly',
    gap?: number,
    children: React.ReactNode
}) {
    return (
        <div
            className={`${styles.flex}`}
            style={{
                justifyContent,
                alignItems,
                gap
            }}
        >
            {children}
        </div>
    )
}

export function Grid({
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    justifyItems = 'flex-start',
    gap = 0,
    children
}: {
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly',
    justifyItems?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly',
    gap?: number,
    children: React.ReactNode
}) {
    return (
        <div
            className={`${styles.grid}`}
            style={{
                alignItems,
                justifyContent,
                justifyItems,
                gap
            }}
        >
            {children}
        </div>
    )
}