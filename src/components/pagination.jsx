import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

export default function Pagination(props) {
  return (
    <ButtonGroup variant="text">
      <Button 
      onClick={(event) => props.triggerPagination(event, 'prev')}
      disabled={!props.prev}>prev</Button>
      <Button 
      onClick={(event) => props.triggerPagination(event, 'next')}
      disabled={!props.next}>next</Button>
    </ButtonGroup>
  )
}
