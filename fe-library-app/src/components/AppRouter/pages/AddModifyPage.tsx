import { useNavigate, useParams } from 'react-router-dom'

import AddModifyBookForm from '../../AddModifyForm/AddModifyBookForm'

const AddModifyPage = () => {
  const navigator = useNavigate()
  const { id } = useParams()
  return (
    <div>
      <AddModifyBookForm onFinish={() => navigator('/book_detail/' + (id as string))} id={id}/>
    </div>
  )
}

export default AddModifyPage
