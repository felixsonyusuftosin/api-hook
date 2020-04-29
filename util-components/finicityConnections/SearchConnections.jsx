import React from 'react'
import { Block, Row } from './styles'
import { Search } from '@components/common'

const SearchConnections = ({ onSubmit, resetFilters, placeholder, ...rest }) => (
  <>
    <Block>
      <Row>
        <Search
          {...rest}
          resetSearchFilters={resetFilters}
          label={placeholder}
          onSubmit={onSubmit}
          showFilters={false}
        />
      </Row>
    </Block>
  </>
)

export default SearchConnections
