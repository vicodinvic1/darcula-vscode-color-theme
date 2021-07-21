import React from 'react'
import PropTypes from 'prop-types'

import Box from 'components/Box'

import { fetchThing } from 'actions/thing'

import * as routes from 'constants/routes'

import { format as formatDate } from 'lib/date'

import useDispatch from 'hooks/useDispatch'
import useRouter from 'hooks/useRouter'

import MyGreatLocalComponent from './MyGreatLocalComponent'

const CURRENT_HOURS = new Date().getHours()
const PRIMARY_VARIANT = 'primary'
const SECONDARY_VARIANT = 'secondary'
const VARIANTS = [PRIMARY_VARIANT, SECONDARY_VARIANT]

export const CAR = {
  accidents: null,
  brand: 'VW',
  model: 'Jetta',
  generation: 6,
  mileage: 50000,
  addMileage (nextMileage) {
    if (!nextMileage) {
      throw new Error('Argument is required at this method')
    }

    if (typeof nextMileage === 'string') {
      Number(nextMileage)
    }

    return this.mileage + nextMileage
  },
  sunroof: undefined
}

function FunctionalComponent (props) {
  const { foo, variant } = props

  const [mounted, setMounted] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const dispatch = useDispatch()
  const { params } = useRouter().location

  const showNiceLayout = true
  const id = params.id

  const primaryVariant = React.useMemo(
    () => variant === PRIMARY_VARIANT,
    [variant]
  )

  const renderBar = React.useCallback(
    () => {
      if (primaryVariant) {
        return 'Variant is primary'
      }

      return 'Variant is secondary'
    },
    [primaryVariant]
  )

  const renderShittyLayout = show => {
    return show && (
      <span style={{ display: 'block' }}>
        🥴
      </span>
    )
  }

  const renderNiceLayout = (show) => (
    show && (
      <Box display='flex' alignItems='center' justifyContent='center'>
        <MyGreatLocalComponent />
      </Box>
    )
  )

  const handleButtonClick = React.useCallback(
    () => setCount(count => count + 1),
    []
  )

  const handleFetchThingById = React.useCallback(
    id => dispatch(fetchThing(id)),
    []
  )

  React.useEffect(() => {
    setMounted(true)
    console.log('Component has been mounted')
  }, [])

  React.useEffect(() => {
    handleFetchThingById(id)
  }, [id])

  return (
    <>
      <div>
        Culpa aute veniam cillum Lorem cupidatat anim quis consectetur velit.
      </div>

      <button onClick={handleButtonClick}>
        Increase count
      </button>

      <a href={routes.ABOUT_US_ROUTE}>
        About us
      </a>

      {foo
        ? (foo === 0 || foo === 10) && foo + count * 2 / (foo - 1 % count)
        : `No ${foo} provided`}

      {mounted && renderBar()}

      {renderShittyLayout(false)}

      {renderNiceLayout(showNiceLayout)}

      {CURRENT_HOURS < 18
        ? formatDate(CURRENT_HOURS)
        : 'You should go home'}
    </>
  )
}

FunctionalComponent.propTypes = {
  foo: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(VARIANTS)
}

FunctionalComponent.defaultProps = {
  variant: PRIMARY_VARIANT
}

export default FunctionalComponent
