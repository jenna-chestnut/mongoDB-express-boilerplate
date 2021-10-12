const makeUsersArr = () => {
  return [
    {
      _id: '6046847eb930aeb69876d000',
      user_name: 'User1',
      full_name: 'FullName1',
      password: 'Password1',
      is_admin: true,
      is_provider: true
    },
    {
      _id: '604678e5852243bcc80b3558',
      user_name: 'User2',
      full_name: 'FullName2',
      password: 'Password2',
      is_admin: false,
      is_provider: false,
      user_goal: 'Get back into your swim team without achy knees!'
    },
    {
      _id: '604678e5852243bcc80b3559',
      user_name: 'User3',
      full_name: 'FullName3',
      password: 'Password3',
      is_admin: false,
      is_provider: false,
      user_goal: 'Fix your posture so you can sit and stand taller & without pain'
    },
    {
      _id: '604678e5852243bcc80b355a',
      user_name: 'User4',
      full_name: 'FullName4',
      password: 'Password4',
      is_admin: false,
      is_provider: false,
      user_goal: 'Feel more comfortable overall, without being afraid of falling or getting injured.'
    },
    {
      _id: '604678e5852243bcc80b355b',
      user_name: 'User5',
      full_name: 'FullName5',
      password: 'Password5',
      is_admin: false,
      is_provider: true
    },
  ];
};

const makeExercisesArr = () => {
  return [
    {
      _id: '604158dc5c22d4d6406cc692',
      exercise_name: 'Back Extension', 
      imgurl: 'https://tinyurl.com/y4qwu5kf', 
      videourl: '3UTHsuDl4vw'
    },
    {
      _id: '604158dc5c22d4d6406cc693',
      exercise_name: 'Cervical Spine Retraction/Extension', 
      imgurl: 'https://tinyurl.com/y249qrbl', 
      videourl: 'ZY3s2Y1dTck'
    },
    {
      _id: '604158dc5c22d4d6406cc695',
      exercise_name: 'Hip Extension', 
      imgurl: 'https://tinyurl.com/yymh2drz', 
      videourl: '5ZdkDtwmgWs'
    },
    {
      _id: '604158dc5c22d4d6406cc694',
      exercise_name: 'Thoracic Extension Sitting', 
      imgurl: 'https://tinyurl.com/y4fwrt4l', 
      videourl: 'U-b_36Uc-9E'
    },
    {
      _id: '604158dc5c22d4d6406cc696',
      exercise_name: 'Knee Flexion', 
      imgurl: 'https://tinyurl.com/y2jmtb3e', 
      videourl: 'lMpP4ngZKw4'
    },
    {
      _id: '604158dc5c22d4d6406cc697',
      exercise_name: 'Elbow Extension', 
      imgurl: 'https://tinyurl.com/y3lqkavl', 
      videourl: 'ry8lUjavfr8'
    },
    {
      _id: '604158dc5c22d4d6406cc698',
      exercise_name: 'Inner Thigh Stretch', 
      imgurl: 'https://tinyurl.com/yxnav4jd', 
      videourl: 'S37HKFbpx4U'
    },
    {
      _id: '604158dc5c22d4d6406cc699',
      exercise_name: 'Wrist Extension', 
      imgurl: 'https://tinyurl.com/y3havjyj', 
      videourl: 'dyCAYuT77iQ'
    },
    {
      _id: '604158dc5c22d4d6406cc69a',
      exercise_name: 'Shoulder Internal Rotation', 
      imgurl: 'https://tinyurl.com/y37oj8lz', 
      videourl: 'Ab6jLeQfHvg'
    }
  ];
};


const makeUserExercisesArr = () => {
  return [
    {
      _id: '60467d7375d2cd48b1aad720',
      exercise: '604158dc5c22d4d6406cc692', 
      user_id: '604678e5852243bcc80b3558',
      frequency: 3,
      duration: 'day', 
      add_note:'Gradually increase pressure if it feels right!'
    },
    {
      _id: '60467d7375d2cd48b1aad721',
      exercise: '604158dc5c22d4d6406cc693', 
      user_id: '604678e5852243bcc80b3558',
      frequency: 1,
      duration: 'hour',
      add_note: 'Take this one slowly, hold off if it hurts.'
    },
    {
      _id: '60467d7375d2cd48b1aad722',
      exercise: '604158dc5c22d4d6406cc695', 
      user_id: '604678e5852243bcc80b3558',
      frequency: 3,
      duration: 'day', 
      add_note:'Be sure to do before bed'
    },
    {
      _id: '60467d7375d2cd48b1aad723',
      exercise: '604158dc5c22d4d6406cc694', 
      user_id: '604678e5852243bcc80b3559',
      frequency: 1,
      duration: '2 hours',
      add_note: 'Be sure to do before & after runnning'
    },
    {
      _id: '60467d7375d2cd48b1aad724',
      exercise: '604158dc5c22d4d6406cc696', 
      user_id: '604678e5852243bcc80b3559',
      frequency: 2,
      duration: 'day', 
      add_note:'Post swim exercise.'
    },
    {
      _id: '60467d7375d2cd48b1aad725',
      exercise: '604158dc5c22d4d6406cc698', 
      user_id: '604678e5852243bcc80b3559',
      frequency: 1,
      duration: 'hour',
      add_note: '10 reps per day maximum!'
    },
    {
      _id: '60467d7375d2cd48b1aad726',
      exercise: '604158dc5c22d4d6406cc697', 
      user_id: '604678e5852243bcc80b355b',
      frequency: 4,
      duration: 'day', 
      add_note:'Let us know if you have any questions!'
    },
    {
      _id: '60467d7375d2cd48b1aad729',
      exercise: '604158dc5c22d4d6406cc699', 
      user_id: '604678e5852243bcc80b355b',
      frequency: 1,
      duration: '4 hours',
      add_note: 'Very important - set an alarm if you need a reminder!'
    },
    {
      _id: '60467d7375d2cd48b1aad727',
      exercise: '604158dc5c22d4d6406cc69a', 
      user_id: '604678e5852243bcc80b355b',
      frequency: 2,
      duration: 'hour',
      add_note: 'Before softball games'
    },
    {
      _id: '60467d7375d2cd48b1aad728',
      exercise: '604158dc5c22d4d6406cc693', 
      user_id: '604678e5852243bcc80b355b',
      frequency: 1,
      duration: 'hour',
      add_note: 'During work in the office'
    },
    {
      _id: '60467d7375d2cd48b1aad72a',
      exercise: '604158dc5c22d4d6406cc692', 
      user_id: '604678e5852243bcc80b355b',
      frequency: 3,
      duration: 'day', 
      add_note:'Can do sitting or standing version'
    }
  ];
};

const makeFixtures = () => {
  const users = makeUsersArr();
  const exercises = makeExercisesArr();
  const user_exercises = makeUserExercisesArr();
  return {
    users,
    exercises,
    user_exercises
  };
};

module.exports = {
  makeUsersArr,
  makeExercisesArr,
  makeUserExercisesArr,
  makeFixtures
};