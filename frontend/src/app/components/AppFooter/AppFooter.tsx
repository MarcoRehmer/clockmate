import styles from './app-footer.module.scss';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import Typography from '@mui/material/Typography';

export const AppFooter = () => {
  const monthlyHours = '130';
  const dailyHours = '6:30';
  const delta = '-3,15h';

  return (
    <div className={styles.container}>
      <span>
        <Typography>Month: {monthlyHours}h</Typography>
      </span>
      <span>
        <Typography>Today: {dailyHours}h</Typography>
      </span>
      <span className={styles['delta-container']}>
        <ChangeHistoryIcon />
        <Typography>{delta}h</Typography>
      </span>
    </div>
  );
};
