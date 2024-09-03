import { Box, Button, CircularProgress } from '@mui/material'

interface ButtonWithLoadingProps{
    isLoading: boolean,
    label: string,
    [k: string]: any
  }
export function ButtonWithLoading({
    isLoading,
    label,
    ...props
  }: ButtonWithLoadingProps){
    return <>
      <Box>
        <Button fullWidth disabled={isLoading} {...props} >
          {isLoading ? (
            <><CircularProgress size='2em' /></>
          ) : (
            <>{label}</>
          )}
        </Button>
      </Box>
    </>
  }