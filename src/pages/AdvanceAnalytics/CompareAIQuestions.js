import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import ReactLoading from 'react-loading';
import { CompareAskAiQuestion, logFirestoreEvent } from '../../merlinv1/beta_api';
import AIAnswerSection from './AIAnswerSection';
import { logEvent } from '../../utils/CommonFunctions';
import { useHistory } from 'react-router-dom';

const QuestionFormSchema = Yup.object({
  question: Yup.string().required('Questions cannot be empty')
});

const AIQuestions = (props) => {
  const [answers, setAnswers] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [textTyped, setTextTyped] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(QuestionFormSchema),
    defaultValues: {
      question: ''
    }
  });

  const history = useHistory();

  const onSubmit = async (data) => {
    // Enables loading state
    setDisabled(true);
    setIsLoading(true);

    // ES6 Format of Async/Await/Catch
    try {
      const productIds = props.productsDisplayed.map(product => product.product_id);
      const res = await CompareAskAiQuestion(productIds, data.question);

      // return less answers than number of products
      if (res.data.length < props.productsDisplayed.length) {
        setIsLoading(false);
        alert(
          'Unexpected problem with AI, try relogging or contacting the Pondr team at hello@letspondr.com'
        );
      } else {
        setAnswers(res.data);
      }
    } catch (err) {
      logFirestoreEvent("404Error", { err: err });
      history.push("/ErrorPage");
    }

    // Turns off loading state
    setIsLoading(false);
    setDisabled(false);
  };

  return (
    <div className='px-4 my-1 pt-5'>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <Card className='block mt-4'>
        <p className='h4 text-center mt-2'>Ask any question to get started.</p>
        <form
          className='mt-10 md:flex flex w-full'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className='flex-1 w-full'
            name='question'
            placeholder='Ask any question!'
            type='search'
            required
            ref={register}
            onChangeText={(newText) => setTextTyped(newText)}
          />
          {isLoading
            ? (
              <ReactLoading type='spin' color='#7779FC' height='5%' width='5%' />
              )
            : (
              <Button
                className='mx-3 w-full md:w-auto mt-4 md:mt-0'
                disabled={disabled || textTyped.split(' ').length < 3}
                type='submit'
              >
                Ask Question
              </Button>
              )}
          <div className='' />
        </form>
      
        {answers.length > 0
          ? answers.map((answer, index) => <AIAnswerSection key={index} answer={answer} />)
          : null}

      </Card>
    </div>
  );
};

export default AIQuestions;
