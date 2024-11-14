import { useState } from 'react';
import { htmlQuestions } from './questions';

// Display only 25 questions per page
const QUESTIONS_PER_PAGE = 25;

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const handleAnswerChange = (questionId, answer, correctAnswer) => {
    setAnswers({ ...answers, [questionId]: answer });
    setFeedback({
      ...feedback,
      [questionId]: answer === correctAnswer ? "Correct!" : "Incorrect.",
    });
  };

  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);

  // Get the questions for the current page
  const currentQuestions = htmlQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 fixed top-0 bg-gray-100 py-4 px-6 w-full text-center ">Accumulated HTML Quiz by AJ</h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mt-20">
        {currentQuestions.map((question) => (
          <div key={question.id} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              {question.text}
            </h2>
            <div className="flex flex-col space-y-2">
              {Object.entries(question.options).map(([key, option]) => {
                const isSelected = answers[question.id] === key;
                const isCorrect = key === question.correctAnswer;

                return (
                  <label
                    key={key}
                    className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                      isSelected ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={key}
                      checked={isSelected}
                      onChange={() => handleAnswerChange(question.id, key, question.correctAnswer)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-600">{option}</span>
                  </label>
                );
              })}
            </div>
            {/* Feedback and Correct Answer Display */}
            {feedback[question.id] && (
              <div className={`mt-2 font-semibold ${feedback[question.id] === "Correct!" ? "text-green-600" : "text-red-600"}`}>
                {feedback[question.id]}
              </div>
            )}
            {feedback[question.id] === "Incorrect." && (
              <div className="mt-1 text-sm text-gray-600">
                Correct Answer: <span className="font-semibold">{question.options[question.correctAnswer]}</span>
              </div>
            )}
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          {currentPage > 0 && (
            <button
              onClick={goToPreviousPage}
              className="bg-gray-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 transition duration-200"
            >
              Previous
            </button>
          )}
          {(currentPage + 1) * QUESTIONS_PER_PAGE < htmlQuestions.length && (
            <button
              onClick={goToNextPage}
              className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200 ml-auto"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
