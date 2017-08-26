import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import styles from './styles';

export default function Screen(props) {
    return (
      <View style={styles.screenContainer}>
        <ScrollView
          style={props.style}
          refreshControl={props.onRefresh &&
            <RefreshControl
              refreshing={!!props.refreshing}
              onRefresh={props.onRefresh}
            />
          }
        >
          {props.children}
        </ScrollView>
      </View>
    );
}
