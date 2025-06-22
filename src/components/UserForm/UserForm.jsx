import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { selectGoToParams, selectUser } from 'redux/auth/selectors';
import { updateUserParams, addUserData } from 'redux/auth/operations';
import RadioOption from './RadioOption';
import css from './UserForm.module.css';
// import { setFullinfo } from 'redux/auth/authSlice';
import { format } from 'date-fns';
const UserForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const params = useSelector(selectGoToParams);


  const bloodOptions = [
    {
      id: '1',
      value: 1,
      label: '1',
    },

    {
      id: '2',
      value: 2,
      label: '2',
    },
    {
      id: '3',
      value: 3,
      label: '3',
    },
    {
      id: '4',
      value: 4,
      label: '4',
    },
  ];
  const sexOptions = [
    {
      id: 'Male',
      value: 'male',
      label: 'Чоловік',
    },
    {
      id: 'Female',
      value: 'female',
      label: 'Жінка',
    },
  ];

  const levelOptions = [
    {
      id: 'level-1',
      value: 1,
      label: 'Сидячий спосіб життя (мала фізична активність або відсутність)',
    },
    {
      id: 'level-2',
      value: 2,
      label: 'Легка активність (легкі вправи/спорт 1-3 дні на тиждень)',
    },
    {
      id: 'level-3',
      value: 3,
      label: 'Помірно активний (помірні вправи/спорт 3-5 днів на тиждень)',
    },
    {
      id: 'level-4',
      value: 4,
      label: 'Дуже активний (інтенсивні вправи/спорт 6-7 днів на тиждень)',
    },
    {
      id: 'level-5',
      value: 5,
      label:
        'Надзвичайно активний (дуже виснажливі вправи/спорт і фізична робота)',
    },
  ];

  const initialValues = {
    name: user.name || 'Name',
    height: user.height || '0',
    currentWeight: user.currentWeight || '0',
    desiredWeight: user.desiredWeight || '0',
    blood: (user.blood ?? '1') || '1',
    sex: user.sex || 'male',
    levelActivity: (user.levelActivity ?? '1') || '1',
    birthday: user.birthday ? format(new Date(user.birthday), 'yyyy-MM-dd') : '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Ім'я обов'язкове"),
    height: Yup.number()
      .positive('Зріст повинен бути додатній')
      .required("Зріст обов'язковий"),
    currentWeight: Yup.number()
      .positive('Вага має бути додатньою')
      .required("Поточна вага обов'язкова"),
    desiredWeight: Yup.number()
      .positive('Вага має бути додатньою')
      .required("Бажана вага обов'язкова"),
  });

  const handleSumbit = values => {
    const { name, height, currentWeight, desiredWeight, ...sendData } = values;
    sendData.name = name;
    sendData.birthday = values.birthday;
    sendData.height = height;
    sendData.currentWeight = currentWeight;
    sendData.desiredWeight = desiredWeight;

  if(params){
    dispatch(addUserData(sendData))
  }else{
    dispatch(updateUserParams(sendData))
  };
};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSumbit}
    >
      {formik => (
        <Form>
          <div className={css.form_container}>
            <div>
              <p className={css.section_title}>Базова інформація</p>
              <input
                className={css.input}
                name="name"
                type="text"
                autocomplete = "off"
                placeholder={user.name}
                value={formik.values.name}
                style={{ color: 'rgba(51, 50, 49, 0.6)' }}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <input
                className={css.input}
                type="text"
                name="email"
                placeholder="Email"
                defaultValue={user.email}
                style={{ color: 'rgba(51, 50, 49, 0.6)' }}
                readOnly
                disabled
              />
            </div>
          </div>
          <div className={css.wrapper_input_field}>
            <div className={css.wrapper_input_section}>
              <div className={css.wrapper_input}>
                <p className={css.section_title}>Зріст</p>
                <input
                  className={css.input_field}
                  type="number"
                  name="height"
                  id="height"
                  placeholder={user.height}
                  value={formik.values.height}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={css.wrapper_input}>
                <p className={css.section_title}>Поточна вага</p>
                <input
                  className={css.input_field}
                  type="number"
                  name="currentWeight"
                  id="currentWeight"
                  placeholder={user.currentWeight}
                  value={formik.values.currentWeight}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className={css.wrapper_input_section}>
              <div className={css.wrapper_input}>
                  <p className={css.section_title}>Бажана вага</p>
                  <input
                    type="number"
                    className={css.input_field}
                    name="desiredWeight"
                    id="desiredWeight"
                    placeholder={user.desiredWeight}
                    value={formik.values.desiredWeight}
                    onChange={formik.handleChange}
                  />
                  </div>
              <div className={css.wrapper_input}>
                <p className={css.section_title}>Дата народження</p>
                  <input
                    type="date"
                    className={css.input_field}
                    name="birthday"
                    id="birthday"
                    placeholder="0"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                  />
                </div>
            </div>
          </div>
          <div className={css.wrapper_radio}>
            <div className={css.wrapper_radio_section}>
                <div className={css.wrapper_radio_section_container_left}>
                  <p className={css.section_title}>Группа крові</p>
                  <div className={css.wrapper_radio_section_blood}>
                    {bloodOptions.map(option => (
                      <RadioOption
                        style={{
                          fontFamily: 'Roboto-400',
                        }}
                        key={option.id}
                        id={option.id}
                        name="blood"
                        checked={formik.values.blood === option.value}
                        label={option.label}
                        onChange={() => formik.setFieldValue('blood', option.value)}
                      />
                    ))}
                  </div>
                </div>
                <div className={css.wrapper_radio_section_container_right}>
                  {sexOptions.map(option => (
                    <RadioOption
                      key={option.id}
                      id={option.id}
                      name="sex"
                      checked={formik.values.sex === option.value}
                      label={option.label}
                      onChange={() => formik.setFieldValue('sex', option.value)}
                    />
                  ))}
                </div>
            </div>
            <div className={css.wrapper_level}>
              {levelOptions.map(option => (
                <RadioOption
                  key={option.id}
                  id={option.id}
                  name="levelActivity"
                  checked={formik.values.levelActivity === option.value}
                  label={option.label}
                  onChange={() =>formik.setFieldValue('levelActivity', option.value)}
                />
              ))}
            </div>
          </div>
          <button className={css.button} type="submit">
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
