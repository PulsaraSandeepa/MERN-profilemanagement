import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
//import the action we want to use
import { registerUser } from "../../actions/authActions";
const Register = (props) => {
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  },[props]);

  useEffect(() => {
    if (props.errors) {
      setstate({ errors: props.errors });
    }
  }, [props.errors]);

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
      errors: state.errors,
    };

    props.registerUser(newUser, props.history);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => setstate({ errors: err.response.data }));
  };

  const errors = state.errors;
  const { user } = props.auth;

  return (
    <div>
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={state.name}
                    onChange={onChange}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={state.email}
                    onChange={onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={state.password2}
                    onChange={onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//componentname
//good practice in mapping all of proptypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
