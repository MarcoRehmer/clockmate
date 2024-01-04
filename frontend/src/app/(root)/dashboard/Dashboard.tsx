'use client';
import { Box, Card } from '@mui/material';
import { UserSummaryCard } from '@/app/(root)/dashboard/components/UserSummaryCard';
import { CurrentRunningCard } from '@/app/(root)/dashboard/components/CurrentRunningCard';
import { BookingTableOptions } from '@/app/(root)/dashboard/components/BookingTableOptions/BookingTableOptions';
import { BookingTable } from '@/app/(root)/dashboard/components/BookingTable/BookingTable';
import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Activity } from '@/app/core/types';
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
  const [reload, setReload] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | undefined>(undefined);

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
      .then((result) => result && setCurrentActivity(mapBookingDtoToBooking(result)))
      .catch((err) => console.error('could not fetch current activity', err));
  }, [api.activities]);

  /* Handler */
  const handleFilterChanged = (filter: TableFilter) => {
    setTableFilter(filter);
  };

  const handleDeleteActivity = async (id: number) => {
    await api.activities
      .delete(id)
      .then(() => console.log('delete succeeded')) // TODO: improve status handling
      .catch((err) => console.error('delete failed', err));

    setReload(true);
  };

  const handleEditActivity = async (id: number, activity: Activity) => {
    await api.activities
      .update(id, mapToUpdateActivity(activity))
      .then(() => console.log('update succeeded')) // TODO: improve status handling
      .catch((err) => console.error('update failed', err));

    setReload(true); // TODO: check, why effect runs twice
  };

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
          <UserSummaryCard />
        </div>
        <Box
          sx={{
            '@media (max-width:780px)': {
              flexGrow: 1,
            },
          }}
        >
          <CurrentRunningCard currentActivity={currentActivity} />
        </Box>
      </Box>

      <Card>
        <BookingTableOptions onFilterChanged={handleFilterChanged} />
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
