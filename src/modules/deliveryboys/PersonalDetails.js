import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DetailsCard from '../../component/DetailsCard';
import {formatDateString} from '../../utils/functions';

const PersonalDetails = ({profile}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <DetailsCard label="Phone number" value={profile.phone} />
        <View style={{flexDirection: 'row', gap: 16}}>
          <DetailsCard label="Gender" value={profile.gender} />
          <DetailsCard label="Age" value={profile.age} />
        </View>
        <DetailsCard label="DOB" value={formatDateString(profile.dob)} />
        <DetailsCard label="State" value={profile?.state?.name} />
        <DetailsCard label="Country" value={profile?.country?.name} />
        <DetailsCard
          label="Joining"
          value={formatDateString(profile.joining)}
        />
        <DetailsCard label="Address" value={profile.address} />
        <DetailsCard label="Password" value={profile.password} />
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    marginBottom: 20,
    gap: 16,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
  },
});
