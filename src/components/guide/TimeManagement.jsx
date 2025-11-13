import React from 'react';

const TimeManagement = () => {
  const sections = [
    {
      title: "Creating a Schedule",
      summary: "How to create an effective study schedule.",
      content: (
        <div>
          <p className="mb-4">
            Good time management starts with creating a realistic schedule that balances academics, personal life, and rest.
          </p>
        </div>
      ),
      steps: [
        "List all your classes and fixed commitments",
        "Block out study time for each subject",
        "Include time for meals and rest",
        "Schedule time for physical activity",
        "Include social time and relaxation",
        "Be realistic about what you can accomplish",
        "Review and adjust your schedule weekly",
        "Use both digital and physical planners"
      ],
      commonMistakes: [
        "Overscheduling and leaving no flexibility",
        "Not including rest time",
        "Being too optimistic about study capacity",
        "Not following the created schedule",
        "Not adjusting when needed"
      ]
    },
    {
      title: "Prioritization Techniques",
      summary: "How to prioritize tasks effectively.",
      content: (
        <div>
          <p className="mb-4">
            Not all tasks are equally important. Learning to prioritize helps you focus on what matters most.
          </p>
        </div>
      ),
      steps: [
        "Use the Eisenhower Matrix (Urgent/Important)",
        "Identify your most productive hours",
        "Tackle difficult tasks when you're most alert",
        "Break large tasks into smaller steps",
        "Set daily and weekly priorities",
        "Learn to say no to non-essential commitments",
        "Review priorities regularly",
        "Focus on one task at a time"
      ],
      commonMistakes: [
        "Treating all tasks as equally important",
        "Multitasking inefficiently",
        "Not setting clear priorities",
        "Getting distracted by minor tasks",
        "Not adapting priorities as situations change"
      ]
    },
    {
      title: "Sample Weekly Schedule",
      summary: "Example of a balanced weekly schedule.",
      content: (
        <div>
          <p className="mb-4">
            Here's a sample schedule to help you structure your week effectively.
          </p>
        </div>
      ),
      steps: [
        "Monday: Classes 8am-2pm, Study 3-5pm, Gym 5-6pm, Dinner 6-7pm, Study 7-9pm",
        "Tuesday: Classes 9am-12pm, Study 1-3pm, Club meeting 4-5pm, Free evening",
        "Wednesday: Classes 8am-1pm, Study 2-4pm, Rest 4-6pm, Study 7-9pm",
        "Thursday: Classes 10am-1pm, Study 2-4pm, Social activity 5-7pm, Light study 8-9pm",
        "Friday: Classes 9am-12pm, Study 1-3pm, Free evening for social activities",
        "Saturday: Morning study 9-11am, Errands 11am-1pm, Free afternoon, Review 7-9pm",
        "Sunday: Morning rest, Light review 2-4pm, Plan week 7-8pm, Free evening"
      ],
      commonMistakes: [
        "Not including enough rest time",
        "Scheduling back-to-back activities",
        "Not including buffer time",
        "Not following the schedule",
        "Being too rigid with the schedule"
      ]
    }
  ];

  return { sections };
};

export default TimeManagement;