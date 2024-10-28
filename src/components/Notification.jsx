const Notification = ({ message, category }) => {
    if (message === null) {
      return null
    }
    
    if (category === 'add') {
        return (
            <div className='add'>
              {message}
            </div>
        )
    }

    if (category === 'error') {
        return (
            <div className='error'>
              {message}
            </div>
        )
    }
    
    if (category === 'update') {
        return (
            <div className='update'>
              {message}
            </div>
        )
    }
    if (category === 'delete') {
        return (
            <div className='delete'>
              {message}
            </div>
        )
    }
  }

export default Notification