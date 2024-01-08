'use client';
import { Box, Card } from '@mui/material';
import { UserSummaryCard } from '@/app/(root)/dashboard/components/UserSummaryCard';
import { CurrentRunningCard } from '@/app/(root)/dashboard/components/CurrentRunningCard';
import { BookingTableOptions } from '@/app/(root)/dashboard/components/BookingTableOptions/BookingTableOptions';
import { BookingTable } from '@/app/(root)/dashboard/components/BookingTable/BookingTable';
import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Activity, UserSummary } from '@/app/core/types';
import { mapBookingDtoToBooking } from '@/app/api/mapper/map-booking-dto-to-booking';
import { ApiContext } from '@/app/provider/appProvider';
import { mapToUpdateActivity } from '@/app/api/mapper/map-partial-activity';

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

  /* Contexts */
  const api = useContext(ApiContext);

  /* Effects */
  useEffect(() => {
    const fetchData = async () =>
      (await api.activities.getActivities(tableFilter)).map((activity) => mapBookingDtoToBooking(activity));

    fetchData()
      .then((result) => setActivities(result))
      .catch((err) => console.error('error while fetching data', err));

    setReload(false);
  }, [api.activities, tableFilter, reload]);

  useEffect(() => {
    const fetchCurrent = async () => await api.activities.getCurrentActivity();

    fetchCurrent()
      .then((result) => setCurrentActivity((result && mapBookingDtoToBooking(result)) || undefined))
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
    await api.activities.delete(id).catch((err) => console.error('delete failed', err));

    setReload(true);
  };

  const handleEditActivity = async (id: number, activity: Activity) => {
    await api.activities.update(id, mapToUpdateActivity(activity));

    setReload(true); // TODO: check, why effect runs twice
  };

  const handleActivityAdded = async (activity: Omit<Activity, 'id'>) => {
    await api.activities
      .create({
        startedAt: activity.startedAt.toISO() || '',
        finishedAt: activity.finishedAt?.toISO() || undefined,
        remarks: activity.remarks,
      })
      .catch((err) => console.error('add activity failed', err));

    setReload(true);
  };

  async function handleStopwatchStart(input: Omit<Activity, 'id'>) {
    await handleActivityAdded(input);
  }

  async function handleStopwatchStop(activityId: number) {
    await api.activities
      .update(activityId, { finishedAt: DateTime.now().toISO() })
      .catch(() => console.error('error while stopping activity with ID ', activityId));

    setReload(true);
  }

  async function handleStopwatchDiscard(activityId: number) {
    await api.activities
      .delete(activityId)
      .catch(() => console.error('error while discard activity with ID ', activityId));

    setReload(true);
  }

  async function handleStopwatchSwitchTask(currentRunningActivityId: number, input: Omit<Activity, 'id'>) {
    await handleStopwatchStop(currentRunningActivityId);

    await handleStopwatchStart(input);
  }

  return (
    <div
      style={{
        marginTop: -60,
      }}
    >
      <Box
        className="flex mb-4 gap-4"
        sx={{
          '@media (max-width: 780px)': {
            flexWrap: 'wrap',
          },
        }}
      >
        <div className="grow">
          <UserSummaryCard summary={summary} />
        </div>
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

      <Card>
        <BookingTableOptions onFilterChanged={handleFilterChanged} onActivityAdded={handleActivityAdded} />
        <BookingTable
          activities={activities}
          filter={tableFilter}
          onDeleteActivity={handleDeleteActivity}
          onEditActivity={handleEditActivity}
        />
      </Card>
    </div>
  );
};
