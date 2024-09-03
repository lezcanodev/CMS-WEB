import { Box, Link, Stack, TextField, Typography } from '@mui/material'
import { FormLayout } from '../layouts/FormLayout';
import { ButtonWithLoading } from '../components/ButtonWithLoading.component';
import { ILoginPage } from '@/templates/interfaces/pages/login.page.interface';

export default function LoginPage({
  onSubmitLogin,
  stateSubmit,
  goToResetPassword,
  goToResetRegister,
  inputs
}: ILoginPage){

    return (<>
            <FormLayout
              title={'Ingresar al sistema'}
              onSubmit={onSubmitLogin}
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
                        <Box textAlign={'right'}>
                          <Typography fontWeight={'light'} fontSize={'.8em'}>
                            <Link onClick={(e) => {e.preventDefault(); goToResetPassword();} } >¿Has olvidado tu contraseña?</Link>
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack marginTop={2} gap={1}>
                            <ButtonWithLoading
                              type='submit' 
                              variant='contained' 
                              sx={{padding: '10px 20px'}}
                              label={'Ingresar'}
                              isLoading={stateSubmit.loading}
                            />
                            <Box textAlign={'left'}>
                            <Typography marginTop={1} fontWeight={'light'} fontSize={'.8em'}>
                                Aun no tienes un cuenta? <Link onClick={(e) => {e.preventDefault(); goToResetRegister();} } >Registrarse</Link>
                            </Typography>
                        </Box>
                      </Stack>
                  </Stack>
            </></FormLayout>
    </>)
}