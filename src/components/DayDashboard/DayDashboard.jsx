import { DiaryDashboardItem } from "../DiaryDashboardItem/DiaryDashboardItem";
import PropTypes from "prop-types";
import css from "./DayDashboard.module.css";

const DayDashboard = ({ diary, bodyData }) => {
  const { burnedCalories, consumedCalories, timeSport } = diary;

  return (
    <div className={css.day_dashboard_container}>
      <div className={css.day_dashboard}>
        <div className={css.diary_left}>
          <DiaryDashboardItem
          svg="fork-and-knife-icon"
           title="Добова норма споживання калорій"
            content={bodyData.dailyRateCalories}
            className={css.diary_item_red}
          />
          <DiaryDashboardItem
            svg="dumbbell-icon"
            title="Денна норма спорту"
            content={bodyData.dailySportMin}
            className={css.diary_item_red}
            measurement="хв"
          />
        </div>
        <div className={css.rigth}>
          <div className={css.btns1}>
            <DiaryDashboardItem
            svg="apple-icon"
               title="Витрачені калорії"
              content={consumedCalories}
            />
            <DiaryDashboardItem
              svg="fire-icon"
              title="Спалені калорії"
              content={burnedCalories}
            />
          </div>
          <div className={css.btns2}>
            <DiaryDashboardItem
              svg="bubble-icon"
              title="Решта калорій"
              content={bodyData.dailyRateCalories - consumedCalories}
              type="calories"
            />
            <DiaryDashboardItem
              svg="run-icon"
               title="Решта спорту"
              content={bodyData.dailySportMin - timeSport}
              type="sport"
              measurement="хв"
            />
          </div>
        </div>
      </div>
      </div>
  );
};

export default DayDashboard;

DayDashboard.propTypes = {
  diary: PropTypes.shape({
    burnedCalories: PropTypes.number,
    consumedCalories: PropTypes.number,
    timeSport: PropTypes.number,
  }),
  bodyData: PropTypes.shape({
    dailyRateCalories: PropTypes.number,
    dailySportMin: PropTypes.number,
  }),
};
