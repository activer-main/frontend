import classNames from 'classnames';
import React from 'react';
import './index.scss';
import { motion } from 'framer-motion';

interface AlertType {
  title: string;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
}

function Alert({
  title, text, icon, className,
}:AlertType) {
  const customClassName = className?.split(' ');
  const classes = classNames(
    {
      alert: true,
    },
    customClassName,
  );

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <i className="alert__icon">{icon}</i>
      <h4 className="alert__title">{title}</h4>
      <p className="alert__text">{text}</p>

    </motion.div>
  );
}

export default Alert;
