const questions = [
  {
    id: 1,
    prompt: 'But first, let’s say hello to each other!',
    type: 'text', // Button where you can input text
  },
  {
    id: 2,
    prompt: 'Hello {name}, where can we send you your custom remedy?',
    type: 'text', // Button where you can input text
  },
  {
    id: 3,
    prompt:
      'Where can we reach you? <br /> <span class=alt>PS- Don’t worry. We won’t be spamming!</span>',
    type: 'text',
  },
  {
    id: 4,
    prompt: 'Which of the following best describes you?',
    type: 'mcq', // Multiple choice
    answers: ['Female', 'Male', 'Other'],
  },
  {
    id: 5,
    prompt:
      "How old are you? <br /> <span class='alt'>(Sorry but we have to ask) </span>",
    type: 'mcq', // Multiple choice
    answers: ['Under 25', '25-35', '36-45', 'Over 45'],
  },
  {
    id: 6,
    prompt:
      "How would you describe your wake up face? <br/> <span class='prompt-alternative'>Alternatively, what does your face feel like 15 minutes post wash?</span>",
    type: 'mcq',
    answers: [
      'Tight & Dry',
      'Oily',
      'Oily in some places & dry in some',
      'Balanced & Normal',
    ],
  },
  {
    id: 7,
    prompt:
      "Do you tend to have adverse reactions to <br/> certain skin care products or ingredients? <br/>  <span class='alt' >We're all made different so certain ingredients can cause irritation. We'll stay away <br/> from these for you </span>",
    type: 'mcq', // Multiple choice
    answers: ['Yes', 'No'],
  },
  {
    id: 8,
    prompt:
      " <span class='alt1'>What do you feel you need help with <br/> most? </span>",
    type: 'mcq', // Multiple choice
    answers: [
      'DrySkin',
      'Pigmentation',
      'OilySkin',
      'SensitiveSkin',
      'Acne',
      'CombinationSkin',
      'TexturedSkin',
    ],
  },
  {
    id: 9,
    prompt:
      "What is the pollution generally like where <br/> you live? <br/> <span class='alt'> PS - You're more than halfway through the questionnaire. Hold tight! </span>",
    type: 'mcq', // Multiple choice
    answers: ['Chill', 'Not chill', 'Out of control'],
  },
  {
    id: 10,
    prompt:
      "How much screen time do you get in a <br/> day? <br/> <span class='alt'> (Whoops! We’re all guilty parties here.) </span>",
    type: 'mcq', // Multiple choice
    answers: ['Less than 2 hours', '2 hours or more'],
  },
  {
    id: 11,
    prompt:
      'Stress is no fun. How often do you find <br/> your self getting worked up?',
    type: 'mcq', // Multiple choice
    answers: ['A lot', 'Sometimes', 'Not so much'],
  },
  {
    id: 12,
    prompt:
      " <span class='alt1'>How often do you struggle with dark <br/> circles or puffy eyes? </span>",
    type: 'mcq', // Multiple choice
    answers: ['Less than 2 hours', '2 hours or more'],
  },
  {
    id: 13,
    prompt:
      'Ok this is a biggie. How many hours of <br/> sleep do you manage at night?',
    type: 'mcq', // Multiple choice
    answers: ['Less than 6 hours', '6 to 8 hours', 'More than 8 hours'],
  },
];

export default questions;
