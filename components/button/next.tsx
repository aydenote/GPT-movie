import { useSelector } from 'react-redux';
import question from '../../question.json';
import { ReduxType } from '@/type';
import styled from 'styled-components';

export default function Next() {
  const questionAnswer = useSelector(state => state) as ReduxType;

  return question.length - 1 === questionAnswer.currentId ? (
    <ModalConfirmButton type="submit">제출</ModalConfirmButton>
  ) : (
    <ModalConfirmButton type="submit">다음</ModalConfirmButton>
  );
}

const ModalConfirmButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  background-color: #f9ca24;
  cursor: pointer;
`;
