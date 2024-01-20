import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ApiContext } from '@/app/provider/appProvider';

interface UploadAvatarDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const UploadAvatarDialog = ({ open, handleClose }: UploadAvatarDialogProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const [reloadUserAvatar, setReloadUserAvatar] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const api = useContext(ApiContext);

  useEffect(() => {
    const fetchAvatarUrl = async () => await api.users.getAvatarUrl();

    fetchAvatarUrl().then((url) => setAvatarUrl(url));
  }, [api, reloadUserAvatar]);

  async function handleUploadAvatar() {
    setUploading(true);

    try {
      await api.users.uploadAvatar();
    } catch (error) {
      console.error('error upload avatar image', error);
    }

    setUploading(false);
  }

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Upload Avatar</DialogTitle>
      <DialogContent>
        <div>
          <Avatar sx={{ width: '250px', height: '250px', margin: '1rem' }} src={avatarUrl} />
          {file ? file.name : 'No file selected...'}
          <Box sx={{ display: 'flex', columnGap: '1rem', justifyContent: 'center', mt: '1rem' }}>
            <Button component="label" variant="contained" disabled={uploading}>
              Browse
              <input
                hidden
                type="file"
                onChange={(val: ChangeEvent<HTMLInputElement>) => val.target.files && setFile(val.target.files[0])}
              />
            </Button>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                disabled={file === undefined || uploading}
                startIcon={<CloudUploadIcon />}
                onClick={() => handleUploadAvatar()}
              >
                Upload
              </Button>
              {uploading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
