import {FlatList, StyleSheet, View} from 'react-native';
import useGetapi from '../../hooks/useGetapi';
import DeliveryItem from '../../component/DeliveryItem';

const CompletedScreen = () => {
  const {data} = useGetapi('activities/delivery-boy-view-completed/');
  return (
    <View style={styles.listContainer}>
      {/* <FlatList
        data={DATA.filter(
          item => item.status === 'Delivered' || item.status === 'Returned',
        )}
        renderItem={({item}) => (
          <DeliveryItem item={item} showBottomSheet={showBottomSheet} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={{backgroundColor: '#fff'}}
      /> */}
    </View>
  );
};

export default CompletedScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
});
