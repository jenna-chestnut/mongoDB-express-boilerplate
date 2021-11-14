const makeExercisesArray = () => {
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

const makeUsersArray = () => {
  return [
    {
      _id: '6046847eb930aeb69876d000',
      user_name: 'User1',
      full_name: 'Test User',
      password: 'password1',
      is_admin: true
    },
    {
      _id: '6046847eb930aeb69876d002',
      user_name: 'User2',
      full_name: 'Another Testuser',
      password: 'password2',
      is_admin: false
    }
  ];
};

const makeUserExercisesArray = () => {
  const users = makeUsersArray();
  const exercises = makeExercisesArray();
  return [
    {
      _id: '60467d7375d2cd48b1aad720',
      exercise: exercises[0]._id, 
      user_id: users[0]._id,
      frequency: 3,
      duration: 'day', 
      add_note:'Gradually increase pressure if it feels right!'
    },
    {
      _id: '60467d7375d2cd48b1aad726',
      exercise: exercises[1]._id, 
      user_id: users[1]._id,
      frequency: 1,
      duration: 'hour', 
      add_note:'A test comment on your test exercise!'
    }
  ];
};

const makeFixtures = () => {
  const users = makeUsersArray();
  const exercises = makeExercisesArray();
  const user_exercises = makeUserExercisesArray();
  return {
    users,
    exercises,
    user_exercises
  };
};

module.exports = {
  makeFixtures,
  makeExercisesArray,
  makeUsersArray,
  makeUserExercisesArray
};