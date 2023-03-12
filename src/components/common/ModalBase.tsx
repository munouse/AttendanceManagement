import { FC, PropsWithChildren, useEffect } from 'react';
import styled from '@emotion/styled';
import { ModalPropsType } from '@hooks/useModal';

interface ModalBaseType {
  modalProps: ModalPropsType;
}

const ModalBase: FC<PropsWithChildren<ModalBaseType>> = ({ modalProps, children }) => {
  const { isShow, hideModal } = modalProps;

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isShow]);

  return (
    <>
      <ModalContainer isShow={isShow}>{children && children}</ModalContainer>
      <Background isShow={isShow} onClick={hideModal} />
    </>
  );
};

export default ModalBase;

const ModalContainer = styled.div<{ isShow: boolean }>`
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 60vh;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  animation: ${({ isShow }) => (isShow ? `0.3s forwards slideIn` : `0.2s ease forwards slideOut`)};
  -webkit-animation: ${({ isShow }) => (isShow ? `0.3s forwards slideIn` : `0.2s ease forwards slideOut`)};

  @keyframes slideIn {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

const Background = styled.div<{ isShow: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  background-color: ${({ isShow }) => (isShow ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)')};
  transition: background-color 0.3s ease;
`;