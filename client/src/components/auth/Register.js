import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import the action we want to use
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../../components/common/TextFieldGroup"

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
  }, [props]);

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


                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  value={state.name}
                  onChange={onChange}
                  error={errors.name}
                />

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

                <TextFieldGroup
                  name="password2"
                  type="password"
                  placeholder="Confirm Password"
                  value={state.password2}
                  onChange={onChange}
                  error={errors.password2}
                />
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
