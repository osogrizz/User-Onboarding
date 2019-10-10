import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({ values, errors, touched, isSubmitting }) => {

  const [users, setUsers] = useState({
    name: '',
    email: '',
    password: '',
    tos: false
  });

  // const handleChange = (evt) => {
  //   evt.preventDefault()
  //   setUser({ ...user, [evt.target.name]: evt.target.value })
  // }

  return (
    <Form>

      <div>
        <Field type="text" name="name" placeholder="Full Name"  />
      </div>
      <div>
        <Field type="email" name="email" placeholder="Email" autoComplete="username"/>
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" autoComplete="current-password" />
        { touched.password && errors.password && <p>{errors.password}</p> }
      </div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos}/>
        Accept TOS
      </label>
      <button type="submit">Submit</button>
    </Form>
  )
}


const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid.')
      .required('Email is required'),
    password: Yup.string()
      .min(6)
      .required('Password is required.')
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    // console.log('submit pressed!!!');
    axios.post('https://reqres.in/api/users')
      .then( response => {
        console.log('res', response);
        setSubmitting(false);
        resetForm();
      })
      .catch( err => {
        console.log(err);
        setSubmitting(false);
      })
    setStatus(values);
    // console.log(values);
  }
  
  
  
  
})(UserForm);

export default FormikUserForm;