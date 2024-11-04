import React from 'react';
import classNames from 'classnames';
import './Button.css';
import Text from '../Text/Text';
import Loader from '../Loader/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  disabled?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Ширина кнопки */
  width?: string | number;
  height?: string | number;
};

const Button: React.FC<ButtonProps> = ({ 
  loading = false, 
  disabled = false, 
  children, 
  className, 
  height= '52px',
  width = '155px', 
  ...props 
}) => {
  // Используем classNames для управления классами кнопки
  const buttonClass = classNames('button', className, {
    'button-loading': loading, // класс для состояния загрузки
    'button-disabled': disabled, // добавляем класс для заблокированной кнопки
  });

  // Рендерим текст кнопки
  const buttonText = (
    <Text tag='div' view="button">
      {children}
    </Text>
  );

  return (
    <button
      className={buttonClass}
      disabled={loading || disabled} // Заблокируем кнопку при loading или disabled
      style={{ width, height}} // Устанавливаем ширину кнопки через инлайн-стиль
      {...props} 
    >
      {loading ? (
        <>
          <Loader size='s' color='#FFFFFF'/>
          {buttonText}
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
