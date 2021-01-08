import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//for the validation
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../../components/common/TextFieldGroup"

const Login = (props) => {
  const [state, setstate] = useState({
    email: "",
    password: "",
    errors: {},
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.errors) {
      setstate({ errors: props.errors });
    }
  }, [props]);

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: state.email,
      password: state.password,
    };

    props.loginUser(userData);
    //console.log(loggedUser);
  };

  const { errors } = state;//destructure

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit} noValidate>
              <TextFieldGroup
                name="email"
                type="email"
                placeholder="Email Address"
                value={state.email}
                onChange={onChange}
                error={errors.email}
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={onChange}
                error={errors.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
