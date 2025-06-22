//import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './StyledDatepicker.module.css'; // ТВОЇ стилі

const StyledDatepicker = ({ selectedDate, setSelectedDate }) => {
  const CustomInput = ({ value, onClick }) => {
    return (
      <button className={styles.titleWrapper} onClick={onClick}>
        {format(new Date(selectedDate), 'dd-MM-yyyy')}
      </button>
    );
  };

  const handlePreviousDay = () => {
    setSelectedDate(prev => subDays(new Date(prev), 1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(new Date(prev), 1));
  };

  return (
    <div>
      <DatePicker
        selected={new Date(selectedDate)}
        onChange={date => setSelectedDate(date)}
        customInput={<CustomInput />}
        dateFormat={'dd-MM-yyyy'}
        calendarStartDay={1}
        formatWeekDay={day => day.substr(0, 1)}
        // Додаємо свій CSS-клас
        popperClassName={styles.reactDatepicker}
        // Переопреділяємо стандартні стилі на свої
        wrapperClassName={styles.reactDatepicker}
        // щоб triangle не заважав
        showPopperArrow={false}
      />
      <div className={styles.datepickerControls}>
        <button className={styles.datepickerBtn} onClick={handlePreviousDay}>{'\u2190'}</button>
        <button className={styles.datepickerBtn} onClick={handleNextDay}>{'\u2192'}</button>
      </div>
    </div>
  );
};

export default StyledDatepicker;
