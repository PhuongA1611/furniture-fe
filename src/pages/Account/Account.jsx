import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../app/AuthSlice';

import './Account.scss';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogined = useSelector((state) => state.auth.isLogged);

  const logout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  return (
    <>
      {isLogined ? (
        <div className="account">
          <Container>
            <Row>
              <Col md={3}>
                <div className="account__nav">
                  <ul>
                    <li>
                      <NavLink to="profile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="orders">Orders</NavLink>
                    </li>
                    <li>
                      <NavLink to="addresses">Addresses</NavLink>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={9}>
                <Outlet />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="main-notice">
          <p>
            You must <Link to="/login">login</Link>!
          </p>
        </div>
      )}
    </>
  );
};

export default Account;
