import React, { useState, useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import Button from 'components/Button';
import './index.scss';

function generateErrorMessage(errorCode: number | undefined): string {
  switch (errorCode) {
    case 400:
      return '錯誤請求';
    case 401:
      return '你沒有權限閱讀此頁';
    case 403:
      return '你被拒絕訪問此頁面';
    case 404:
      return '此頁面不存在';
    case 408:
      return '請求逾時';
    case 429:
      return '太多請求，請稍後再試';
    case 500:
      return '伺服器內部錯誤';
    case 502:
      return '錯誤網關';
    case 503:
      return '服務不可用';
    case 504:
      return '網關逾時';
    case 418:
      return '🫖';
    case undefined:
      return '無法連接到伺服器';
    default:
      return '似乎發生一些未預期的錯誤';
  }
}

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export function throwError(message: string, status: number) {
  throw new CustomError(message, status);
}

function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError() as any;
  const [errorTitle, setErrorTitle] = useState<string>('Oops!');
  const [errorMessage, setErrorMessage] = useState<string>('似乎發生一些未預期的錯誤');
  const [errorCode, setErrorCode] = useState<number>();

  useEffect(() => {
    if (error instanceof CustomError) {
      /** Custom Error */
      setErrorTitle(error.message);
      setErrorMessage(generateErrorMessage(error.status));
      setErrorCode(error.status);
    } else if (isRouteErrorResponse(error)) {
      /** react-router-dom: erro */
      setErrorTitle(error.statusText || error.data);
      setErrorMessage(generateErrorMessage(error.status));
      setErrorCode(error.status);
    } else if (error.name === 'AxiosError') {
      setErrorTitle(error.response?.statusText);
      setErrorCode(error.response?.status);
      setErrorMessage(generateErrorMessage(error.response?.status));
    }

    // show in console
    // eslint-disable-next-line
    console.error(error);
  }, []);

  return (
    <div className="error">
      <Header />
      <div className="error__main">

        <h1 className="error__title">
          {errorTitle}
        </h1>

        <div className="error__message">
          {errorCode}
          :
          {' '}
          {errorMessage}
        </div>

        <Button text="問題回報" />
        <Button
          text="按此返回上一頁"
          variant={{ outline: true }}
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}

export default ErrorBoundary;
