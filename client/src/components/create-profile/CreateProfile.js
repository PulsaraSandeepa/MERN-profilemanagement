import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'


const CreateProfile = (props) => {
    const [state, setState] = useState({

        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    })

    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center"> Create Your Profile</h1>
                        <p className="lead text-center">
                            Let's make your profile strong
                        </p>
                        <small className="d-block pb-3">* = required fields</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapstateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})
export default connect(null)(CreateProfile)

