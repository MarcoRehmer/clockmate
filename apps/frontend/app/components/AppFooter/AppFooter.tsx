import styles from './app-footer.module.scss';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

export const AppFooter = () => {
  return (
    <div className={styles.container}>
      <span>Month: 130h</span>
      <span>Today: 6:30h</span>
      <span><ChangeHistoryIcon />: -3,15h</span>
    </div>
  );
};
