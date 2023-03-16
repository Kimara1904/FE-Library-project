import { useNavigate, useParams } from 'react-router-dom'

import AddModifyBookForm from '../../AddModifyForm/AddModifyBookForm'

const AddModifyPage = () => {
  const navigator = useNavigate()
  const { id } = useParams()
  return (
    <div>
      <AddModifyBookForm onFinish={() => navigator('/home')} id={id}/>
    </div>
  )
}

export default AddModifyPage
