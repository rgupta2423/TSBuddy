import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {KeyboardAvoidingView, SafeAreaView, TextInput} from 'react-native';
import SearchIconSVG from 'assets/newDashboardIcons/search.svg';
import {Colors} from 'colors/Colors';

const Search = forwardRef(({styles, searchEmployeesHandler}, ref) => {
  const [enteredValue, setEnteredValue] = useState('');
  const searchInputHandler = enteredText => {
    setEnteredValue(enteredText);
  };

  useEffect(() => {
    searchEmployeesHandler && searchEmployeesHandler(enteredValue);
  }, [enteredValue, searchEmployeesHandler]);

  useImperativeHandle(ref, () => ({
    resetEnteredValue() {
      setEnteredValue('');
    },
  }));

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        contentContainerStyle={{}}
        style={[styles?.searchContainer, styles.customSearchContainer]}>
        <TextInput
          value={enteredValue}
          onChangeText={searchInputHandler}
          placeholder="Search"
          style={styles?.textInput}
        />
        <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});
export default Search;
