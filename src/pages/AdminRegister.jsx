import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GrUserAdmin } from 'react-icons/gr'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/admin/adminSlice'
import Spinner from '../components/Spinner'
import HeaderBack from '../components/HeaderBack'

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }



  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const adminData = {
        name,
        email,
        password,
      }

      dispatch(register(adminData))
        .unwrap()
        .then((admin) => {
          toast.success(`Registered new admin - ${admin.name}`)
          navigate('/admin-login')
        })
        .catch(toast.error)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <HeaderBack/>
    <div className="pageContainer">
      <section className='heading'>
        <h1>
          <GrUserAdmin /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
      </div>
    </>
  )
}

export default AdminRegister