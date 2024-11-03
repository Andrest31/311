import React from 'react';
import './Card.css'; // Стили для карточки
import Text from '../Text/Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => (
  <div className={`card ${className}`}>
    <img src={image} alt="card-image" className="card-image"  onClick={onClick}/>

    <div className="card-content">
      <div className="card-body "  onClick={onClick}>
        {captionSlot && <Text tag="p" color="secondary" view="p-14">{captionSlot}</Text>}
        {title && <Text tag="p" data-testid="text" className="card-title" weight="bold" view="p-20">{title}</Text>}
        {subtitle && <Text tag="p" data-testid="text" className="card-subtitle" color="secondary" view="p-16">{subtitle}</Text>}
      </div>
      <div className="card-button">
        {contentSlot && <Text tag="p" weight="bold" view="p-18">{contentSlot}</Text>}
        {actionSlot && <div>{actionSlot}</div>}
      </div>
    </div>
  </div>
);

export default Card;
