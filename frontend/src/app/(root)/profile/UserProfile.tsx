'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { EditableLabel } from './EditableLabel';
import { ChangePasswordForm } from './ChangePasswordForm';
import { sleep } from '@/app/utils/sleep';

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
              <Avatar sx={{ width: 100, height: 100 }} />
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
