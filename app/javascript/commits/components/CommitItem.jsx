import React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'

import { Markup } from 'interweave';

const cardStyle = {
  maxWidth: 750,
  margin: '25px auto'
}

const titleStyle = {
  paddingBottom: 6
}

const messageHeadlineStyle = {
  paddingBottom: 2,
  paddingTop: 4,
  fontSize: '16px'
};
const messageBodyStyle = {
  paddingTop: 0,
  fontSize: '14px'
};

export default class CommitItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
    this.props.resize();
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    const {commitData} = this.props
    return (
      <Card expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        initiallyExpanded={true}
        style={cardStyle}
      >
        <CardHeader
          title={commitData.author.name}
          subtitle={commitData.author.email}
          avatar={commitData.author.avatarUrl}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={false} style={messageHeadlineStyle} actAsExpander={true}>
          <Markup content={commitData.messageHeadlineHTML} />
        </CardText>

        { commitData.messageBodyHTML && commitData.messageBodyHTML.length > 0 &&
          <CardText expandable={true} actAsExpander={true} style={messageBodyStyle}>
            <Markup content={commitData.messageBodyHTML} />
          </CardText>
        }
        <CardActions>
          <RaisedButton
            href={commitData.commitUrl}
            target="_blank"
            primary={true}
            label="See on GitHub"
          />
        </CardActions>
      </Card>
    )
  }
}
