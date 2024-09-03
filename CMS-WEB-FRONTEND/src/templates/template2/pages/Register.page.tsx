import { Box, Link, Stack, TextField, Typography } from '@mui/material'
import { FormLayout } from '../layouts/FormLayout';
import { ButtonWithLoading } from '../components/ButtonWithLoading.component';
import { IRegisterPage } from '@/templates/interfaces/pages/register.page.interface';

export default function RegisterPage({
  goToLogin,
  onSubmitRegister,
  inputs,
  stateSubmit
}: IRegisterPage){

    return (<>
            <FormLayout
              title={'Registrarse'}
              onSubmit={onSubmitRegister}
            ><>
                    <Stack gap={2}>
                      {stateSubmit.error?.general && <Typography color={'error'}>
                        {stateSubmit.error?.general}
                      </Typography>}
                      <TextField
                            fullWidth 
                            variant="outlined"
                            {...inputs.username}
                      />
                      <Stack>
                        <TextField
                            fullWidth 
                            autoComplete={''}
                            variant="outlined"
                            {...inputs.password}
                        />
                      </Stack>
                      <Stack marginTop={2} gap={1}>
                            <ButtonWithLoading
                              type='submit' 
                              variant='contained' 
                              sx={{padding: '10px 20px'}}
                              label={'Registrarse'}
                              isLoading={stateSubmit.loading}
                            />
                            <Box textAlign={'left'}>
                            <Typography marginTop={1} fontWeight={'light'} fontSize={'.8em'}>
                                Ya tienes un cuenta? <Link onClick={(e) => {e.preventDefault(); goToLogin();} } >Ingresar</Link>
                            </Typography>
                        </Box>
                      </Stack>
                  </Stack>
            </></FormLayout>
    </>)
}