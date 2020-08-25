import React, { useState } from 'react';
import Pagination from './pagination';
import UserPage from './userPage';
import { Router, Link, Route } from 'react-router-dom';
import history from '../history';
import { TextField, Button, Typography, Card, Grid} from '@material-ui/core';

export default function SearchForm() {
  const [apiURL, setApiURL] = useState({
    prevPage: undefined, 
    nextPage: undefined,
  });
  const [usersList, setUsersList] = useState(undefined);

  function parseLinkHeader(response) {
    let parse = require('parse-link-header');
    let headerString = response.headers.get('Link');
    let parsed = parse(headerString);
    if (parsed) {
      setApiURL({
        nextPage: 'next' in parsed ? parsed.next.url : undefined,
        prevPage: 'prev' in parsed ? parsed.prev.url : undefined,
      });
    }
  }

  function handleSubmit(event, heading=undefined) {
    event.preventDefault();
    const headingURL = heading === 'prev' ? apiURL.prevPage: apiURL.nextPage;
    fetch(headingURL)
    .then(res => { 
      parseLinkHeader(res);
      return res.json(); 
    })
    .then(res => {
      if (res.total_count > 0) {
        setUsersList(res.items);
        history.push('/search');
      }
      else {
        history.push('/404');
      }
    });
  }

  function handlePagination(event, heading) {
    handleSubmit(event, heading)
  }

  const linkList = usersList ? usersList.map((user) => {
    return (
    <Grid item xs={4} align='center' key={user.id}>
    <Card style={{padding: '1%', width: '50%'}}>
      <Link 
      to={`/search/${user.login}`} 
      style={{ 'textDecoration': 'none' }}>
        <Typography color='textSecondary' variant='h5'>{user.login}</Typography>
      </Link>
    </Card> 
    </Grid>
  )}) : undefined;

  const routeList = usersList ? usersList.map((user) => {
    return <Route exact path={`/search/${user.login}`} key={user.id}>
      <UserPage user={user}/>
      </Route>
  }) : undefined;

  return(
    <Router history={history}>
      <Grid 
      container
      spacing={3}
      direction="column"
      justify="center"
      alignItems="center">
      <Route path='/'>
        <Grid item>
      <Typography 
      variant="h1"
      color="textSecondary">Git_Search</Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
        <TextField 
        id="standard-basic" 
        label="Login"
        onChange={event => setApiURL({
          nextPage:`https://api.github.com/search/users?q=${event.target.value}`
          })}/>
          </Grid>
          <Grid item>
        <Button 
        variant="outlined"
        type="submit"
        size="large">SEARCH</Button>
        </Grid>
        </Grid>
      </form>
      </Route>
      <Route exact path='/404'>
        <Grid item>
          <Typography 
          variant='h5'
          color='textSecondary'>Sorry, nothing was found :(</Typography>
        </Grid>
      </Route>
      <Route exact path='/search'>
        <Grid item>
        <Grid container 
        spacing={1} 
        alignItems='center' 
        style={{paddingTop: '1%'}}>
          {linkList}
        </Grid>
        </Grid>
      <Grid item>
      <Pagination 
      triggerPagination={handlePagination}
      prev={apiURL.prevPage}
      next={apiURL.nextPage}/>
      </Grid>
      </Route>
      {routeList}
      </Grid>
    </Router>
  );
}
