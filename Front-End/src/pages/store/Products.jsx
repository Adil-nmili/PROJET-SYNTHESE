import ListeProducts from '@/components/Partials/ListeProducts'
import {useParams} from 'react-router-dom'

function Products() {
  const paramse = useParams();
  console.log(paramse)
  return (
    <div>
        <ListeProducts />
    </div>
  )
}

export default Products