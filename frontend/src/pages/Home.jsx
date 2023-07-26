import { lazy, Suspense } from 'react'
import { BestsellerProducts, Carousel_mui} from '../components'
import { ErrorBoundary } from "react-error-boundary";

// const Carousel_mui = lazy(() => import("./../components/Carousel_mui"))
// const  BestsellerProducts = lazy(() => import("./../components/BestsellerProducts"))

const Home = () => {
  const fallBack = ({error, resetErrorBoundary}) => {
    return <h1>{error.message}</h1>
  }
  return <>
  {/* <Suspense fallback={<h1>Carousel Loading...</h1>}> */}
    <ErrorBoundary fallbackRender={fallBack}>
  <Carousel_mui/>
    </ErrorBoundary>
  {/* </Suspense> */}

  {/* <Suspense fallback={<h1>Products Loading...</h1>}> */}
    <ErrorBoundary fallbackRender={fallBack}>
  <BestsellerProducts/>
    </ErrorBoundary>
  {/* </Suspense> */}
  </>
}

export default Home