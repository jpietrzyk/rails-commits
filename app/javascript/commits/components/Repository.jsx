import React from "react";
import ReactDOM from "react-dom"

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import LinearProgress from 'material-ui/LinearProgress'
import CommitList from './CommitList'

const RepositoryQuery = gql`
  query RepositoryQuery {
    repository(owner:"rails",name:"rails") {
      id
      ref(qualifiedName:"refs/heads/master") {
        target {
          ... on Commit {
            id

          }
        }
      }
    }
  }
`

const RepositoryData = graphql(RepositoryQuery, {
  props({ data: {loading, error, repository} }) {
    return {
      loading,
      error,
      repository
    }
  }
})

const Repository =({loading, error, repository}) => {

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <CommitList key={repository.id} refId={repository.ref.target.id}/>
  )
}

export default RepositoryData(Repository)
