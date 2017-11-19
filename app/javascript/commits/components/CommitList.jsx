import React from "react"
import ReactDOM from "react-dom"

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CircularProgress from 'material-ui/CircularProgress'

import CommitLoader from './CommitLoader'

const CommitsHistory = gql`
  fragment History on Commit {
    history(first:2,after:$after) {
      __typename
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges @connection(key: "CommitsListHistory_CommitEdges", filters: []) {
        cursor
        node {
          id
          oid
          messageHeadlineHTML
          messageBodyHTML
          message
          commitUrl
          committedDate
          author {
            name
            email
            avatarUrl
          }
        }
      }
    }
  }
`

const CommitListQuery = gql`
  query CommitListQuery($refId:ID!,$after:String) {
    node(id:$refId) {
      ... on Commit {
        ...History
      }
    }
  }
  ${CommitsHistory}
`


const CommitListData = graphql(CommitListQuery, {
  props({ data: { loading, node, fetchMore, error }, ownProps: { refId } }) {
    return {
      loading,
      error,
      node,
      refId,
      loadMoreEntries: () => {
        return fetchMore({
          variables: {
            first: 2,
            after: node.history.pageInfo.endCursor,
            refId: refId
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult }
            const newEdges = fetchMoreResult.node.history.edges;
            const pageInfo = fetchMoreResult.node.history.pageInfo;

            return Object.assign({}, previousResult, {
              node: {
                __typename: fetchMoreResult.node.__typename,
                history: {
                  __typename: fetchMoreResult.node.history.__typename,
                  edges: [...previousResult.node.history.edges, ...newEdges],
                  pageInfo: pageInfo
                }
              }
            })
          }
        })
      }
    }
  },
  options: ({refId}) => ({
    variables: {
      refId: refId
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    addTypename: true
  })
})

const CommitList =({loading, error, loadMoreEntries, refId, node}) => {
  if (node && node.history) {
    return (
      <div>
        <CommitLoader loadMoreEntries={loadMoreEntries} items={node.history.edges} hasNextPage={node.history.pageInfo.hasNextPage} />
      </div>
    )
  } else {
    return <div/>
  }
}

export default CommitListData(CommitList)

