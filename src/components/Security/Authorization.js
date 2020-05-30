/**
 * Routes:
 *   - ./src/components/Security/Authentication.js
 */
import Forbidden from '@/components/Security/Forbidden';

export default (props) => {
  // Mock role, get it from server or token
  // const userRoles = ['user', 'manager'];   // allowed
  const userRoles = ['user'];                 // forbidden

  const {children} = props;

  if (children.props.route.roles.some(role => userRoles.includes(role))) {
    return <>{children}</>;
  }

  return <Forbidden/>;

};
