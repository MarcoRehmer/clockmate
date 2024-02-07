'use client';
import { BookingTable } from '@/app/(root)/dashboard/components/BookingTable/BookingTable';
import { BookingTableOptions } from '@/app/(root)/dashboard/components/BookingTableOptions/BookingTableOptions';
import { CurrentRunningCard } from '@/app/(root)/dashboard/components/CurrentRunningCard';
import { UserSummaryCard } from '@/app/(root)/dashboard/components/UserSummaryCard';
import { mapActivityDtoToActivity } from '@/app/api/mapper/map-booking-dto-to-booking';
import { mapToUpdateActivity } from '@/app/api/mapper/map-partial-activity';
import { Activity, UserInfo, UserSummary } from '@/app/core/types';
import { ApiContext } from '@/app/provider/appProvider';
import { Alert, Box, Card, Snackbar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DateTime } from 'luxon';
import Script from 'next/script';
import React, { useContext, useEffect, useState } from 'react';

interface DashboardOptions {
  filter: {
    rangeTo: string;
    rangeFrom: string;
  };
}

export type TableFilter = DashboardOptions['filter'];

export const Dashboard = () => {
  /* States */
  const [tableFilter, setTableFilter] = useState<TableFilter>({
    rangeFrom: DateTime.now().startOf('month').toFormat('yyyy-MM-dd'),
    rangeTo: DateTime.now().endOf('month').toFormat('yyyy-MM-dd'),
  });
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [summary, setSummary] = useState<UserSummary>({
    today: { hours: 0, minutes: 0 },
    week: { hours: 0, minutes: 0 },
    month: { hours: 0, minutes: 0 },
  });
  const [currentActivity, setCurrentActivity] = useState<Activity | undefined>(undefined);
  const [reload, setReload] = useState(false);
  const [snackMessage, setSnackMessage] = useState<{ status: 'success' | 'error'; message: string } | undefined>(
    undefined
  );
  const [initialLoading, setInitialLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [extension, setExtension] = useState<{ script: string; name: string } | undefined>(undefined);

  /* Contexts */
  const api = useContext(ApiContext);

  const litElement = `
  import {LitElement, css, html} from 'lit';

export class SimpleGreeting extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css\`
    :host {
      color: blue;
    }
  \`;

  constructor() {
    super();
    // Declare reactive properties
    this.name = 'World';
  }

  // Render the UI as a function of component state
  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}
customElements.define('simple-greeting', SimpleGreeting);
  `;

  /* Effects */
  useEffect(() => {
    const fetchData = async () => {
      return (await api.activities.getActivities(tableFilter)).map((activity) => mapActivityDtoToActivity(activity));
    };

    fetchData()
      .then((result) => {
        setActivities(result);
        setReload(false);
        setInitialLoading(false);
      })
      .catch((err) => console.error('error while fetching data', err));

    const fetchUserInfo = async () => await api.users.current();
    const fetchAvatarUrl = async (avatarID?: string) => await api.users.getAvatarUrl(avatarID);
    fetchUserInfo().then((usr) => {
      fetchAvatarUrl(usr.avatarImageID).then((url) => setAvatarUrl(url));
      setUserInfo(usr);
    });

    const fetchExtension = async () => await api.extensions.load('foo');
    fetchExtension().then((ext) => {
      setExtension({ name: 'hello-marco', script: ext });
    });
  }, [api.activities, tableFilter, reload, api.users, api.extensions]);

  useEffect(() => {
    const fetchCurrent = async () => await api.activities.getCurrentActivity();

    fetchCurrent()
      .then((result) => setCurrentActivity((result && mapActivityDtoToActivity(result)) || undefined))
      .catch((err) => console.error('could not fetch current activity', err));
  }, [api.activities, reload]);

  useEffect(() => {
    const fetchSummary = async () => await api.reports.summary({});

    fetchSummary()
      .then((result) => setSummary(result))
      .catch(() => console.log('error while fetching summary'));
  }, [api.reports, reload]);

  /* Handler */
  const handleFilterChanged = (filter: TableFilter) => {
    setTableFilter(filter);
  };

  const handleDeleteActivity = async (id: number) => {
    try {
      await api.activities.delete(id);

      setSnackMessage({ status: 'success', message: 'Activity deleted' });
      setReload(true);
    } catch (e) {
      setSnackMessage({ status: 'error', message: 'error while deleting activity' });
    }
  };

  const handleEditActivity = async (id: number, activity: Activity) => {
    try {
      await api.activities.update(id, mapToUpdateActivity(activity));

      setSnackMessage({ status: 'success', message: 'Activity updated' });

      setReload(true);
    } catch (error) {
      setSnackMessage({ status: 'error', message: 'error while editing activity' });
    }
  };

  const handleActivityAdded = async (activity: Omit<Activity, 'id'>) => {
    console.log('activity', activity);
    try {
      await api.activities.create({
        startedAt: activity.startedAt.toISO() || '',
        finishedAt: activity.finishedAt?.toISO() || undefined,
        remarks: activity.remarks,
        projectID: activity.projectID,
        clientID: activity.clientID,
      });

      setSnackMessage({ status: 'success', message: 'Activity added' });
      setReload(true);
    } catch (error) {
      setSnackMessage({ status: 'error', message: 'error while adding activity' });
    }
  };

  const handleStopwatchStart = async (input: Omit<Activity, 'id'>) => {
    try {
      await api.activities.create({
        startedAt: input.startedAt.toISO() || '',
        remarks: input.remarks,
        projectID: input.projectID,
        clientID: input.clientID,
      });
      setReload(true);
      setSnackMessage({ status: 'success', message: 'Stopwtach started' });
    } catch (error) {
      setSnackMessage({ status: 'error', message: 'error while starting stopwatch' });
    }
  };

  async function handleStopwatchStop(activityId: number) {
    try {
      await api.activities.update(activityId, { finishedAt: DateTime.now().toISO() });

      setSnackMessage({ status: 'success', message: 'Activity stopped' });
      setReload(true);
    } catch (error) {
      setSnackMessage({ status: 'error', message: 'error while stopping stopwatch' });
    }
  }

  async function handleStopwatchDiscard(activityId: number) {
    try {
      await api.activities.delete(activityId);

      setSnackMessage({ status: 'success', message: 'Activity discarded' });
      setReload(true);
    } catch (error) {
      setSnackMessage({ status: 'error', message: 'error while discarding activity' });
    }
  }

  async function handleStopwatchSwitchTask(currentRunningActivityId: number, input: Omit<Activity, 'id'>) {
    try {
      await handleStopwatchStop(currentRunningActivityId);

      await handleStopwatchStart(input);
      setSnackMessage({ status: 'success', message: 'Switched to new activity' });
    } catch (error) {
      setSnackMessage({ status: 'error', message: 'error while switching activity' });
    }
  }

  return (
    <>
      <div>
        <Box
          sx={{
            mb: 2,
            columnGap: 2,
            display: 'flex',
            '@media (max-width: 780px)': {
              flexWrap: 'wrap',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <UserSummaryCard
              summary={summary}
              loading={initialLoading}
              avatarUrl={avatarUrl}
              userFullName={userInfo && `${userInfo.firstName} ${userInfo.lastName}`}
            />
          </Box>
          <Box
            sx={{
              '@media (max-width:780px)': {
                flexGrow: 1,
              },
            }}
          >
            <CurrentRunningCard
              currentActivity={currentActivity}
              onStart={handleStopwatchStart}
              onStop={handleStopwatchStop}
              onSwitchTask={handleStopwatchSwitchTask}
              onDiscard={handleStopwatchDiscard}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid xs={8}>
            <Card>
              <BookingTableOptions onFilterChanged={handleFilterChanged} onActivityAdded={handleActivityAdded} />
              <BookingTable
                activities={activities}
                filter={tableFilter}
                onDeleteActivity={handleDeleteActivity}
                onEditActivity={handleEditActivity}
                loading={initialLoading}
              />
            </Card>
          </Grid>

          <Grid xs={4}>
            <Card>
              <>
                {React.createElement('test-esm-greeter', { name: 'Bob', counter: 3 })}
                {/* <ui5-button>My First Button</ui5-button> */}

                <Script type="module" id="blabla">
                  {litElement}
                </Script>
                {React.createElement('simple-greeting', { name: 'Marco' })}
              </>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackMessage !== undefined}
        onClose={() => setSnackMessage(undefined)}
      >
        <Alert onClose={() => setSnackMessage(undefined)} severity={snackMessage?.status} sx={{ width: '100%' }}>
          <Typography>{snackMessage?.message}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};
