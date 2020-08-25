import React from 'react';
import { Card, Typography, Grid, Avatar } from '@material-ui/core';

export default function UserPage(props) {
  return(
    <Grid item>
    <Grid container 
    direction='column' 
    alignItems='center' 
    spacing={2} 
    style={{paddingTop: '25%',}}>
      <Grid item>
      <Typography 
      variant="h3" 
      color="textSecondary">{props.user.login}</Typography>
      </Grid>
      <Grid item>
      <Avatar 
      src={props.user.avatar_url}
      variant='rounded'
      alt='User avatar'
      style={{height: '300px', width: '300px'}}
      />
      </Grid>
      <Grid item>
      <Card style={{textAlign: 'center', margin: '-5%'}}>
      <a 
      href={props.user.html_url}
      target='_blank'
      rel='noopener noreferrer'
      style={{'textDecoration': 'none'}}>
        <Typography 
        color='textSecondary' variant='h6'>Visit profile</Typography>
      </a>
      </Card>
      </Grid>
    </Grid>
    </Grid>
  );
}
