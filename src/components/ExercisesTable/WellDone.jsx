import React from 'react';
import style from './ExerciseModal.module.css';
import sprite from '../../images/svg/sprite.svg';
import thumbUp from '../../images/thumb_up@2x.png';
import { Link } from 'react-router-dom';

const WellDone = ({ finishFunc, handleClose, time, calories }) => {
  const handleFinishExercise = () => {
    finishFunc();
  };
  return (
    <div className={style.welDoneWindow}>
      <button
        className={style.close}
        onClick={() => {
          handleClose();
        }}
      >
        <svg className={style.closeIcon}>
          <use href={sprite + '#icon-cross'}></use>
        </svg>
      </button>
      <img src={thumbUp} alt="Well done!" width={120} height={74} />
      <h5 className={style.title}>Гарна робота!</h5>
      <div className={style.textBox}>
        <p className={style.doneTip}>
          Ваш час:
          <span className={style.doneScore}>{time} хвилин(и)</span>
        </p>
        <p className={style.doneTip}>
          Спалені калорії:
          <span className={style.doneScore}>{calories}</span>
        </p>
        <button
          type="button"
          onClick={handleFinishExercise}
          className={style.btnDone}
        >
         Наступна вправа
        </button>
        <Link to="/diary" className={style.link}>
          До щодденника{' '}
          <svg width="16" height="16">
            <use
              href={sprite + '#arrow_add_icon'}
              className={style.linkArrow}
            ></use>
          </svg>{' '}
        </Link>
      </div>
    </div>
  );
};

export default WellDone;
