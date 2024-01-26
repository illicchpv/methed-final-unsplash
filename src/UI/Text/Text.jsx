import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Text.module.css';

const Text = (props) => {
  const {
    As = 'span',
    color = 'black',
    size,
    tsize,
    dsize,
    className,
    children,
    href,
    center,
    onClick,
    medium,
    bold,
    italic,
  } = props;

  const classes = classNames(
    className,
    style[color],
    {[style[`fs${size}`]]: size},
    {[style[`fst${tsize}`]]: tsize},
    {[style[`dst${dsize}`]]: dsize},
    {[style.center]: center},
    {[style[`medium`]]: medium},
    {[style[`bold`]]: bold},
    {[style[`italic`]]: italic},
  );

  return <As className={classes} href={href} onClick={onClick}>{children}</As>;
};
Text.propTypes = {
  // children: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.object,
  //   PropTypes.array,
  // ]),
  As: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  href: PropTypes.string,
  center: PropTypes.bool,
  onClick: PropTypes.func,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
};
export default Text;
