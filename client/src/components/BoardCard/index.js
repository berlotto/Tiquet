// Packages
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Project
import './styles.scss';

const BoardCard = ({ className, boardInfo }) => (
  <Link to={'/b/' + boardInfo.id} className="text-decoration-none">
    <div className={cn('boardcard', className)} >
      <h4 className="boardcard__title">{boardInfo.title}</h4>
    </div>
  </Link>
)

BoardCard.propTypes = {
  className: propTypes.string,
  boardInfo: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }).isRequired,
}

export default BoardCard;