import ClockLoader from "react-spinners/ClockLoader";
import PropTypes from 'prop-types';

export const Preloader = () => (
  <ClockLoader color='#cc6633'
    cssOverride={{display: 'block'}}
    size={30}/>
)

Preloader.propTypes = {
  props: PropTypes.object,
};
