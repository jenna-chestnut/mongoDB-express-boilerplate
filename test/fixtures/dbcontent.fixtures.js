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
    }
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