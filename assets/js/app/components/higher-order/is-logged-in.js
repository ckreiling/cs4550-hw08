import { connect } from "react-redux";

const mapStateToProps = ({ token }) => ({
  isLoggedIn: !!token
});

/**
 * Higher-order component for passing a Boolean 'isLoggedIn' prop to any
 * component.
 */
export default function(Component) {
  return connect(
    mapStateToProps,
    null
  )(Component);
}
