import React from 'react';

const AIAnswerSection = (props) => {
  return (
    <div>
      {
        props.answer
          ? (
            <>
              <div className='mx-3 h-1/4 w-full my-4 px-3 py-6 text-white bg-blue-pondr rounded'>
                <p className='font-semibold'>Answers:</p>
                <div className='pb-5' />
                {props.answer['AI Answers'].map((currAnswer, index) => (
                  <p key={index} className='mb-2'>
                    {currAnswer}
                    <hr className='my-4' />
                  </p>
                ))}
              </div>
              <div className='mx-3 h-1/4 w-full my-4 px-3 py-6 text-white bg-gray-500 rounded'>
                <p className='font-semibold'>Reviews Referenced:</p>
                <div className='pb-5' />
                {props.answer.Reviews.map((review, index) => {
                  return (
                    <div className='mb-2' key={index}>
                      <p>{review}</p>
                      <hr className='my-4' />
                    </div>
                  );
                })}
              </div>
            </>
            )
          : null
      }
    </div>

  );
};

export default AIAnswerSection;
