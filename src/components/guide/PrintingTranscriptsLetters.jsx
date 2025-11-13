import React from 'react';

const PrintingTranscriptsLetters = () => {
  const sections = [
    {
      title: "Requesting Transcripts",
      summary: "How to request and obtain your academic transcripts.",
      content: (
        <div>
          <p className="mb-4">
            Transcripts are essential for job applications, further studies, and other official purposes.
          </p>
        </div>
      ),
      steps: [
        "Go to the Examinations Office",
        "Fill out the transcript request form",
        "Pay the required fee at the cashier",
        "Provide proof of payment to the Exams Office",
        "Specify the number of copies needed",
        "Indicate if you need sealed envelopes",
        "Check the processing time (usually 3-5 working days)",
        "Collect when notified or arrange for delivery"
      ],
      commonMistakes: [
        "Not requesting transcripts early enough",
        "Not filling the form correctly",
        "Not keeping the receipt",
        "Not checking processing times",
        "Not requesting enough copies"
      ]
    },
    {
      title: "Types of Official Letters",
      summary: "Various official letters you might need from the university.",
      content: (
        <div>
          <p className="mb-4">
            The university provides various official letters for different purposes.
          </p>
        </div>
      ),
      steps: [
        "Student Status Letters for visa applications",
        "Enrollment Verification Letters",
        "Proof of Attendance Letters",
        "Character Reference Letters",
        "Internship Placement Letters",
        "Fee Payment Confirmation Letters",
        "Completion Letters for pending results",
        "Recommendation Letters from departments"
      ],
      commonMistakes: [
        "Not knowing which letter is needed",
        "Not requesting letters in advance",
        "Not providing correct information",
        "Not following up on requests",
        "Not keeping copies of letters"
      ]
    },
    {
      title: "Fees and Processing",
      summary: "Understanding costs and processing times.",
      content: (
        <div>
          <p className="mb-4">
            Different documents have different fees and processing times.
          </p>
        </div>
      ),
      steps: [
        "Check current fee schedules at relevant offices",
        "Transcripts: Approximately GHS 50 per copy",
        "Status Letters: Approximately GHS 20-30",
        "Processing times vary from 1-5 working days",
        "Expedited processing available at extra cost",
        "Pay at designated bank or cashier",
        "Keep all payment receipts",
        "Track request status if possible"
      ],
      commonMistakes: [
        "Not checking current fees",
        "Not having exact payment amounts",
        "Not keeping receipts",
        "Not allowing enough processing time",
        "Not knowing expedited options"
      ]
    }
  ];

  return { sections };
};

export default PrintingTranscriptsLetters;