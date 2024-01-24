'use client';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import StopIcon from '@mui/icons-material/Stop';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import { Activity, Client, Project } from '@/app/core/types';
import { AppContext } from '@/app/provider/appProvider';

export const Stopwatch = (props: {
  currentActivity: Activity | undefined;
  onStart: (input: Omit<Activity, 'id'>) => void;
  onSwitchTask: (currentRunningActivityId: number, input: Omit<Activity, 'id'>) => void;
  onStop: (activityId: number) => void;
  onDiscard: (activityId: number) => void;
}) => {
  const appContext = useContext(AppContext);

  // TODO: refactoring to useReducer
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [remarks, setRemarks] = useState('');
  const [popoverMode, setPopoverMode] = useState<'start' | 'switch'>('start');
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  const popoverOpen = Boolean(popoverAnchorEl);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now();
      const diff = now.diff(props.currentActivity?.startedAt ?? now, 'seconds');
      setCurrentTime(diff.toFormat('hh:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [props.currentActivity]);

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetForm();
    setPopoverMode('start');
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleRunStopwatchClick = () => {
    props.currentActivity === undefined
      ? props.onStart({
          startedAt: DateTime.now(),
          remarks,
          projectID: selectedProject?.projectID,
          clientID: selectedClient?.clientID,
        })
      : props.onSwitchTask(props.currentActivity.id, {
          startedAt: DateTime.now(),
          remarks,
          projectID: selectedProject?.projectID,
          clientID: selectedClient?.clientID,
        });
    handlePopoverClose();
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleStopClick = () => {
    props.currentActivity && props.onStop(props.currentActivity.id);
  };

  const handleSwitchTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetForm();
    setPopoverMode('switch');
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleDiscardClick = () => {
    // TODO: implement confirm dialog
    props.currentActivity && props.onDiscard(props.currentActivity.id);
  };

  const resetForm = () => {
    setRemarks('');
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
    <>
      <div>
        {props.currentActivity !== undefined ? (
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ alignSelf: 'center', color: 'primary.main' }}>{currentTime}</Typography>

            <Box>
              <IconButton sx={{ color: 'text.primary' }} onClick={handleStopClick} aria-label="stop">
                <StopIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'text.primary' }}
                onClick={handleSwitchTaskClick}
                aria-label="change task"
                size="large"
              >
                <CallSplitIcon style={{ rotate: '90deg' }} />
              </IconButton>
              <IconButton sx={{ color: 'text.primary' }} onClick={handleDiscardClick} aria-label="discard">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <IconButton sx={{ color: 'text.primary' }} onClick={handleStartClick} aria-label="start">
            <PlayArrowIcon />
          </IconButton>
        )}
      </div>

      <Popover
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography sx={{ p: 2, pb: 0 }} variant="h6">
          {popoverMode === 'switch' ? 'Switch Task' : 'Start Task'}
        </Typography>
        <Box sx={{ p: 2, pt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', rowGap: 2 }}>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select
              labelId="client-select-label"
              label="Client"
              value={selectedClient?.clientID || ''}
              onChange={(event) =>
                setSelectedClient(appContext.clients.find((client) => client.clientID === event.target.value))
              }
            >
              <MenuItem value={''}>
                <em>None</em>
              </MenuItem>
              {appContext.clients.map((client) => (
                <MenuItem key={client.clientID} value={client.clientID}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: '100%' }}>
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
              <MenuItem value={''}>
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
            label="Remarks"
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
            variant="standard"
          />
          <Button onClick={handleRunStopwatchClick}>{popoverMode === 'start' ? 'Start' : 'Switch'}</Button>
        </Box>
      </Popover>
    </>
  );
};
