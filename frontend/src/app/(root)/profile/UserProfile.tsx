import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const UserProfile = () => {
  return (
    <>
      <Card sx={{ margin: 'auto', marginTop: '-60px', maxWidth: '900px' }} className={'header-offset'}>
        <CardHeader title="User Profile" />
        <CardContent>
          <Grid container rowSpacing={4} columnSpacing={4}>
            {/* Avatar and Name */}
            <Grid md={2}>
              <Avatar sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid md={10}>
              <Typography fontSize="small">Name</Typography>
              <Typography fontSize="large" color="text.secondary">
                Max Mustermann
              </Typography>
            </Grid>

            {/* Divider */}
            <Grid xs={12}>
              <Divider />
            </Grid>

            {/* Basic Data */}
            <Grid md={2}>
              <Typography color="text.secondary">Basic Data</Typography>
            </Grid>
            <Grid md={10}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
                <Box>
                  <Typography fontSize="small">E-Mail Address</Typography>
                  <Typography fontSize="large" color="text.secondary">
                    max.mustermann@exmaple.com
                  </Typography>
                </Box>

                <Box>
                  <Typography fontSize="small">Password</Typography>
                  <Typography fontSize="large" color="text.secondary">
                    **********
                  </Typography>
                  <Button>Change Password</Button>
                </Box>
              </Box>
            </Grid>

            {/* Divider */}
            <Grid xs={12}>
              <Divider />
            </Grid>

            {/* User Settings */}
            <Grid md={2}>
              <Typography color="text.secondary">Preferences</Typography>
            </Grid>
            <Grid md={10}>
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
