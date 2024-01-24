import { Activity, Client, Project } from '@/app/core/types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import { useContext, useState } from 'react';
import styles from './create-booking-dialog.module.scss';
import { DateTime } from 'luxon';
import { AppContext } from '@/app/provider/appProvider';

interface CreateActivityDialogProps {
  open: boolean;
  handleClose: (booking: Omit<Activity, 'id'> | undefined) => void;
}

export const CreateActivityDialog = ({ open, handleClose }: CreateActivityDialogProps) => {
  const [remarks, setRemarks] = useState('');
  const [bookingDate, setBookingDate] = useState(DateTime.now());
  const [startedAt, setStartedAt] = useState<DateTime>(DateTime.now());
  const [finishedAt, setFinishedAt] = useState<DateTime | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  const appContext = useContext(AppContext);

  const combineDateWithTime = (date: DateTime, time: DateTime): DateTime => {
    return DateTime.fromObject({
      year: date.year,
      month: date.month,
      day: date.day,
      hour: time.hour,
      minute: time.minute,
    });
  };

  const filterProjectsByClient = (clientID?: number) => {
    const visibleProjects = clientID
      ? appContext.projects.filter((project) => project.clientID === clientID || !project.clientID)
      : appContext.projects;
    if (selectedProject !== undefined && !visibleProjects.includes(selectedProject)) {
      setSelectedProject(undefined);
    }

    return visibleProjects;
  };

  const selectClientByProject = (project?: Project) => {
    if (project === undefined || project.clientID === undefined) {
      return;
    }

    setSelectedClient(appContext.clients.find((client) => client.clientID === project.clientID));
  };

  return (
    <Dialog open={open} onClose={() => handleClose(undefined)}>
      <DialogTitle>Create new Activity</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 2, width: '35ch' }}>
          <DatePicker
            label="activity date"
            defaultValue={DateTime.now()}
            value={bookingDate}
            onChange={(value) => setBookingDate(value || DateTime.now())}
          />
          <Box sx={{ display: 'flex', columnGap: 2 }}>
            <TimeField
              label="started at"
              clearable={true}
              variant="standard"
              value={startedAt}
              onChange={(value) => setStartedAt(value || DateTime.now())}
            />
            <TimeField
              label="finished at"
              variant="standard"
              clearable={true}
              value={finishedAt}
              onChange={(value) => setFinishedAt(value || undefined)}
            />
          </Box>

          <FormControl variant="standard">
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select
              labelId="client-select-label"
              label="Client"
              value={selectedClient?.clientID || ''}
              onChange={(event) =>
                setSelectedClient(appContext.clients.find((client) => client.clientID === event.target.value))
              }
            >
              <MenuItem value={undefined}>
                <em>None</em>
              </MenuItem>
              {appContext.clients.map((client) => (
                <MenuItem key={client.clientID} value={client.clientID}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="project-select-label">Project</InputLabel>
            <Select
              labelId="project-select-label"
              label="Project"
              value={selectedProject?.projectID || ''}
              onChange={(event) => {
                const project = appContext.projects.find((project) => project.projectID === event.target.value);
                setSelectedProject(project);
                selectClientByProject(project);
              }}
            >
              <MenuItem value={undefined}>
                <em>None</em>
              </MenuItem>
              {filterProjectsByClient(selectedClient?.clientID).map((project) => (
                <MenuItem key={project.projectID} value={project.projectID}>
                  {project.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="remarks"
            label="Remarks"
            fullWidth
            variant="standard"
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(undefined)}>Cancel</Button>
        <Button
          onClick={() =>
            handleClose({
              startedAt: combineDateWithTime(bookingDate, startedAt),
              finishedAt: finishedAt ? combineDateWithTime(bookingDate, finishedAt) : undefined,
              remarks: remarks.length > 0 ? remarks : undefined,
              clientID: selectedClient?.clientID || undefined,
              projectID: selectedProject?.projectID || undefined,
            })
          }
        >
          Create Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};
