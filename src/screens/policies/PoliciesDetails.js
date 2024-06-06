import React, {useEffect, useState} from 'react';
import CustomHeader from 'navigation/CustomHeader';
import WebView from 'react-native-webview';
const PoliciesDetails = ({navigation, route}) => {
  const [policiesData, setPoliciesData] = useState('');
  const policy = route.params;

  const source = {
    html: policiesData,
  };

  useEffect(() => {
    if (policy) {
      setPoliciesData(policy);
    }
  }, [policy]);

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Policy Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      {/* <ScrollView style={{flex: 1}}> */}
      {/* <RenderHtml
          source={source}
          contentWidth={width}
          baseStyle={{margin: 20, color: 'black'}}
          ignoredDomTags={['o:p']}
        /> */}

      <WebView source={source} minimumFontSize={20} />
      {/* </ScrollView> */}
    </>
  );
};

export default PoliciesDetails;
