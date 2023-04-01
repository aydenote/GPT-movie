import { useSelector, useDispatch } from 'react-redux';
import { BEFORE } from '@/redux/reducers/question';
import { ReduxType } from '@/type';
import styled from 'styled-components';

export default function Before() {
  const questionAnswer = useSelector(state => state) as ReduxType;
  const dispatch = useDispatch();

  /** 이전 질문으로 이 함수 */
  const handleBefore = () => {
    const currentAnswer = document.querySelector('input') as HTMLInputElement;

    // 이전 질문에 대한 답변 있다면 답변 내용 표시
    if (questionAnswer.currentId >= 1) {
      dispatch(BEFORE());
      currentAnswer.value = questionAnswer.dataList[questionAnswer.currentId - 1].answer;
    }
    return;
  };

  return (
    <ModalCancelButton type="button" onClick={handleBefore}>
      이전
    </ModalCancelButton>
  );
}

const ModalCancelButton = styled.button`
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  background-color: #999;
  cursor: pointer;
`;
