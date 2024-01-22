'use client';

import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext, useEffect, useState } from 'react';
import { EditableLabel } from './EditableLabel';
import { ChangePasswordForm } from './ChangePasswordForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { sleep } from '@/app/utils/sleep';
import { ApiContext, AppContext } from '@/app/provider/appProvider';
import { UserInfo } from '@/app/core/types';
import { encryptPassword } from '@/app/utils/encrypt-password';
import { UploadAvatarDialog } from './UploadAvatarDialog';

const ImageButton = styled(ButtonBase)({
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: '50%',
  overflow: 'hidden',
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const UserProfile = () => {
  const [statusMessage, setStatusMessage] = useState<
    { title: string; cause: string; servity: 'error' | 'success' } | undefined
  >(undefined);
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadAvatarDialogOpen, setUploadAvatarDialogOpen] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const api = useContext(ApiContext);

  useEffect(() => {
    const fetchUserInfo = async () => await api.users.current();

    setLoading(true);

    fetchUserInfo().then((value) => {
      setCurrentUserInfo(value);
    });

    const fetchAvatarUrl = async () => await api.users.getAvatarUrl();
    fetchAvatarUrl().then((url) => setAvatarUrl(url));

    Promise.all([fetchUserInfo, fetchAvatarUrl]).then(() => setLoading(false));
  }, [api.users]);

  async function handleMailAdressChanged(newValue: string) {
    try {
      const userID = extractUserId();

      await api.users.updateProfile(userID, { email: newValue });
      updateCurrentUserInfo({ email: newValue });
    } catch (error: any) {
      setStatusMessage({ title: 'E-Mail Address could not be changed', cause: error.message, servity: 'error' });
    }
  }

  async function handleFirstNameChanged(newValue: string) {
    try {
      const userID = extractUserId();

      await api.users.updateProfile(userID, { firstName: newValue });
      updateCurrentUserInfo({ firstName: newValue });
    } catch (error: any) {
      setStatusMessage({ title: 'First Name could not be changed', cause: error.message, servity: 'error' });
    }
  }

  async function handleLastNameChanged(newValue: string) {
    try {
      const userID = extractUserId();

      await api.users.updateProfile(userID, { lastName: newValue });
      updateCurrentUserInfo({ lastName: newValue });
    } catch (error: any) {
      setStatusMessage({ title: 'Last Name could not be changed', cause: error.message, servity: 'error' });
    }
  }

  const extractUserId = (): number => {
    if (currentUserInfo === undefined) {
      throw new Error('UserID not provided');
    }

    return currentUserInfo.userID;
  };

  // TODO: use reducer here
  const updateCurrentUserInfo = (userInfo: Partial<UserInfo>) => {
    currentUserInfo && setCurrentUserInfo({ ...currentUserInfo, ...userInfo });
  };

  const handleChangePasswordRequest = async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: true } | { success: false; wrongCurrentPassword: boolean }> => {
    try {
      const hashedCurrentPassword = await encryptPassword(currentPassword);
      const hashedNewPassword = await encryptPassword(newPassword);

      await api.users.changePassword(hashedCurrentPassword, hashedNewPassword);
      setStatusMessage({ title: 'Password changed', cause: 'Password successfully changed!', servity: 'success' });
      return { success: true };
    } catch (error) {
      setStatusMessage({ title: 'Password could not be changed', cause: 'Server Error', servity: 'error' });
      return { success: false, wrongCurrentPassword: false };
    }
  };

  async function handleAvatarUrlChange(id: string) {
    setAvatarUrl(await api.users.getAvatarUrl(id));
  }

  return (
    <>
      <Card sx={{ margin: 'auto', maxWidth: '900px' }} className={'header-offset'}>
        <CardHeader title="User Profile" />
        <CardContent>
          <Grid container rowSpacing={4} columnSpacing={4}>
            {/* Avatar and Name */}
            <Grid md={2} xs={12}>
              <ImageButton onClick={() => setUploadAvatarDialogOpen(true)}>
                <VisuallyHiddenInput type="file" />
                <Avatar sx={{ width: 120, height: 120 }} src={avatarUrl} />
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
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                  }}
                >
                  <AddAPhotoIcon sx={{ color: 'white' }} />
                </Box>
              </ImageButton>
              {uploadAvatarDialogOpen && (
                <UploadAvatarDialog
                  open={uploadAvatarDialogOpen}
                  changeAvatarUrl={(id) => handleAvatarUrlChange(id)}
                  handleClose={() => setUploadAvatarDialogOpen(false)}
                />
              )}
            </Grid>
            <Grid md={10} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
                <EditableLabel
                  caption="First Name"
                  value={currentUserInfo?.firstName || ''}
                  onValueSaved={(newValue) => handleFirstNameChanged(newValue)}
                />
                <EditableLabel
                  caption="Last Name"
                  value={currentUserInfo?.lastName || ''}
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
                    value={currentUserInfo?.email || ''}
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
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={statusMessage !== undefined}
        onClose={() => setStatusMessage(undefined)}
      >
        <Alert onClose={() => setStatusMessage(undefined)} severity={statusMessage?.servity} sx={{ width: '100%' }}>
          <Typography>{statusMessage?.title}</Typography>
          <Typography fontSize="small">{statusMessage?.cause}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};
