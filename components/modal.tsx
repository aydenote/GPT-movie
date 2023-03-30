import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, UPDATE } from '../redux/reducers/question';
import { useRouter } from 'next/router';
import BeforeButton from './button/before';
import NextButton from './button/next';
import questionJson from '../question.json';
import { ReduxType } from '@/type';
import styled from 'styled-components';

export default function modal() {
  const questionAnswer = useSelector(state => state) as ReduxType;
  const dispatch = useDispatch();
  const router = useRouter();

  /** 질문과 답변 저장, 다음 질문으로 이동 함수 */
  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentQuestion = questionJson.filter(item => item.id === questionAnswer.currentId)[0];
    const currentAnswer = document.querySelector('input') as HTMLInputElement;

    // 마지막 질문에 대한 답변 제출
    if (questionAnswer.currentId === 3) {
      handleResult();
      return;
    }

    // 질문과 답변 저장
    if (questionAnswer.currentId <= 3 && !questionAnswer.dataList[questionAnswer.currentId]) {
      dispatch(ADD({ question: currentQuestion.question, answer: currentAnswer.value }));
      currentAnswer.value = '';
      return;
    } else {
      dispatch(UPDATE({ id: questionAnswer.currentId, answer: currentAnswer.value }));
      currentAnswer.value = questionAnswer.dataList[questionAnswer.currentId + 1]
        ? questionAnswer.dataList[questionAnswer.currentId + 1].answer
        : '';
    }
    return;
  };

  /** 전체 답변 제출 후 결과 페이지로 이동 */
  function handleResult() {
    const currentQuestion = questionJson.filter(item => item.id === questionAnswer.currentId)[0];
    const currentAnswer = document.querySelector('input') as HTMLInputElement;
    dispatch(ADD({ question: currentQuestion.question, answer: currentAnswer.value }));

    router.push('/result');
    return;
  }

  /** 질문 ID에 대한 각 질문 내용 출력 함수 */
  function handleQuestion() {
    return questionJson.filter(item => item.id === questionAnswer.currentId)[0]?.question;
  }

  /** 각 질문에 대한 답변 예시 출력 함수  */
  function handlePlaceholder() {
    return questionJson.filter(item => item.id === questionAnswer.currentId)[0]?.example;
  }



  return (
    <Container>
      {
        <Modal>
          <ModalHeader>
            <ModalTitle>질문</ModalTitle>
          </ModalHeader>
          <ModalContent>{handleQuestion()}</ModalContent>
          <form onSubmit={handleNext}>
            <Input type="text" placeholder={handlePlaceholder()} required />
            <ModalFooter>
              <BeforeButton />
              <NextButton />
            </ModalFooter>
          </form>
        </Modal>
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
`;

const Modal = styled.div`
  position: absolute;
  top: 30%;
  width: 280px;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const ModalContent = styled.p`
  margin: 0;
  line-height: 1.5;
  font-size: 16px;
  text-align: center;
  color: #000;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 240px;
  height: 40px;
  margin: 30px 10px 10px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #f4f4f4;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: #000;
  ::placeholder {
    color: #000;
  }
`;
