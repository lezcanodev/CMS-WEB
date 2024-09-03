

export interface InputProps{
    name: string,
    type: 'text' | 'password' | 'numeric'     
    label: string
    value: any
    onChange: (e: any) => void
    onBlur: (e: any) => void
    error: boolean
    helperText: string
}