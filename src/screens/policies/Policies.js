import React from 'react';
import CustomHeader from 'navigation/CustomHeader';
const {Text, FlatList, View} = require('react-native');
import styles from './PoliciesStyle';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPolicies} from 'redux/homeSlice';
import {useIsFocused} from '@react-navigation/native';
import {ERROR} from 'utils/string';
import ShowAlert from 'customComponents/CustomError';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from 'component/loader/Loader';

const Policies = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [policiesData, setPoliciesData] = useState([]);
  const isFocussed = useIsFocused();

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        setLoading(true);
        const policies = await dispatch(
          getPolicies({
            token,
          }),
        );

        setPoliciesData(policies.payload);

        setLoading(false);

        if (policies?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: policies?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();
    }
  }, [isFocussed, dispatch, token]);

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.policy}
        onPress={() => {
          navigation.navigate('policiesDetails', item.policy);
        }}>
        <View style={styles.request}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.policyId}</Text>
          </View>
          <View style={styles.policyTextContainer}>
            <Text style={styles.policyText}>{item.policyName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Policies"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={policiesData}
          keyExtractor={key => key.policyId}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default Policies;
