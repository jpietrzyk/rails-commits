import React, { Component } from 'react';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import CellMeasurer, {
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';

import CommitItem from './CommitItem'

import 'react-virtualized/styles.css';

export default class CommitLoader extends React.Component {
  _cache = new CellMeasurerCache({ defaultHeight: 200, fixedWidth: true });
  _resizeAllFlag = false;

  componentDidUpdate(prevProps, prevState) {
    if (this._resizeAllFlag) {
      this._resizeAllFlag = false;
      this._cache.clearAll();
      if (this._list) {
        this._list.recomputeRowHeights();
      }
    } else if (this.props.items !== prevProps.items) {
      const index = prevProps.items.length;
      this._cache.clear(index, 0);
      if (this._list) {
        this._list.recomputeRowHeights(index);
      }
    }
  }

  _resizeAll = () => {
    this._resizeAllFlag = false;
    this._cache.clearAll();
    if (this._list) {
      this._list.recomputeRowHeights();
    }
  };

  _setListRef = ref => {
    this._list = ref;
    this._registerList(ref);
  };

  _rowRenderer = ({index, isScrolling, key, parent, style}) => {
    const {items} = this.props

    let content;

    if (index >= items.length) {
      content = <LoadingIndicator />
    } else {
      content = (
        <CommitItem
          commitData={items[index].node}
          key={items[index].node.oid}
          isScrolling={isScrolling}
          resize={this._resizeAll}
        />
      )
    }

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div style={style}>
          {content}
        </div>
      </CellMeasurer>
    )
  }

  _isRowLoaded = ({index}) => {
    return !!this.props.items[index]
  }

  render() {
    const {hasNextPage, items, loadMoreEntries} = this.props
    const rowCount = items.length + 1

    return (
      <div>
        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={loadMoreEntries}
          rowCount={rowCount}
          threshold={5}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => {

                this._registerList = registerChild
                return (
                  <List
                    deferredMeasurementCache={this._cache}
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    onRowsRendered={onRowsRendered}
                    ref={this._setListRef}
                    rowCount={items.length}
                    rowHeight={this._cache.rowHeight}
                    rowRenderer={this._rowRenderer}
                    width={790}
                  />
                )
              }}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}
