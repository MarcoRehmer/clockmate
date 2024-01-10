'use client';

import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { EditableLabel } from './EditableLabel';
import { ChangePasswordForm } from './ChangePasswordForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { sleep } from '@/app/utils/sleep';

const ImageButton = styled(ButtonBase)({
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: '50%',
  overflow: 'hidden',
});

export const UserProfile = () => {
  const [mailAddress, setMailAddress] = useState('max.mustermann@exmaple.com');
  const [firstName, setFirstName] = useState('Max');
  const [lastName, setLastName] = useState('Mustermann');

  function handleMailAdressChanged(newValue: string): void {
    setMailAddress(newValue);
  }

  function handleFirstNameChanged(newValue: string): void {
    setFirstName(newValue);
  }

  function handleLastNameChanged(newValue: string): void {
    setLastName(newValue);
  }

  const handleChangePasswordRequest = async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: true } | { success: false; wrongCurrentPassword: boolean; message: string }> => {
    await sleep(1500);
    return Promise.resolve({ success: true });
  };

  return (
    <>
      <Card sx={{ margin: 'auto', maxWidth: '900px' }} className={'header-offset'}>
        <CardHeader title="User Profile" />
        <CardContent>
          <Grid container rowSpacing={4} columnSpacing={4}>
            {/* Avatar and Name */}
            <Grid md={2} xs={12}>
              <ImageButton>
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F145908%2Fraw%2F52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg&sp=1704903082T37e0f2b538a4a5ad1c6829068baa19e237a53e602dc4a3812a344580c9876250"
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                  }}
                >
                  <AddAPhotoIcon sx={{ color: 'white' }} />
                </Box>
              </ImageButton>
            </Grid>
            <Grid md={10} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
                <EditableLabel
                  caption="First Name"
                  value={firstName}
                  onValueSaved={(newValue) => handleFirstNameChanged(newValue)}
                />
                <EditableLabel
                  caption="Last Name"
                  value={lastName}
                  onValueSaved={(newValue) => handleLastNameChanged(newValue)}
                />
              </Box>
            </Grid>

            {/* Divider */}
            <Grid xs={12}>
              <Divider />
            </Grid>

            {/* Basic Data */}
            <Grid md={2} xs={12}>
              <Typography color="text.secondary">Basic Data</Typography>
            </Grid>
            <Grid md={10} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
                <Box>
                  <EditableLabel
                    caption="E-Mail Address"
                    value={mailAddress}
                    onValueSaved={(newValue) => handleMailAdressChanged(newValue)}
                  />
                </Box>

                <ChangePasswordForm onPasswordChanged={handleChangePasswordRequest} />
              </Box>
            </Grid>

            {/* Divider */}
            <Grid xs={12}>
              <Divider />
            </Grid>

            {/* User Settings */}
            <Grid md={2} xs={12}>
              <Typography color="text.secondary">Preferences</Typography>
            </Grid>
            <Grid md={10} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
                <Typography>coming soon...</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
