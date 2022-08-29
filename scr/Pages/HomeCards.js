import * as React from 'react'
import { View, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native'
import { Text, Card, Icon, Button } from 'react-native-elements'
import { fetchCards } from '../API';
import { deleteCard } from '../API';

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [load, setLoad] = React.useState(true)

  React.useEffect(() => {
    fetchCards()
      .then(response => response.json())
      .then(responseJson => {
        setCards(responseJson.data.allCards.edges)
        setRefreshing(false)
      }).catch(error => {
        console.error(error);
      }
      );
    navigation.addListener('focus', () => setLoad(!load))
  }, [refreshing, load]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);



  function handleClose() {
    setModalVisible(!modalVisible)
    setCurrentCard(null)
  }

  return (
    <>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
          setCurrentCard(null)
        }
        }
      >
        <TouchableOpacity style={styles.modal} onPress={handleClose}>
          <View style={styles.modalContent}>
            <Button
              containerStyle={styles.button}
              buttonStyle={{ backgroundColor: '#8B18D3', height: 50, width: 70 }}
              title="Editar"
              onPress={() => {
                handleClose();
                navigation.navigate('CreateEdit', { card: currentCard })
              }} />
            <Button
              buttonStyle={{ backgroundColor: '#8B18D3', height: 50 }}
              containerStyle={styles.button}
              title="Deletar"
              onPress={() => {
                deleteCard(currentCard.id)
                setModalVisible(!modalVisible)
                setRefreshing(true)
              }} />
          </View>
        </TouchableOpacity>
      </Modal>
      <View>
        <FlatList
          refreshing={refreshing} // Added pull to refesh state
          onRefresh={onRefresh}
          data={cards}
          keyExtractor={item => item.node.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DatailCard', { card: item.node })
              }}>
              <Card containerStyle={styles.container}>
                <View style={styles.content}>
                  <View style={styles.header}>
                    <Icon
                      name='time'
                      type="ionicon"
                      color={item.node.labels.map(label => label.color).join("")}
                      iconStyle={{ marginRight: 2 }}
                    />
                    <Card.Title>
                      <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{item.node.title}</Text>
                    </Card.Title>
                    <Icon
                      name="ellipsis-vertical-outline"
                      type="ionicon"
                      color="#121212"
                      onPress={() => {
                        setModalVisible(true);
                        setCurrentCard(item.node)
                      }}
                    />
                  </View>
                  <Card.Divider />
                  <Text style={{ marginBottom: 10 }} numberOfLines={2}>
                    <Text style={{ fontWeight: 'bold' }} >Description: {"\n"}</Text>
                    {item.node.subtitles.filter(subtitle => subtitle.name === "Product description").map(subtitle => "-  " + subtitle.value)}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          )
          }
        />
      </View >
      <TouchableOpacity style={styles.createButton}
        onPress={() => {
          navigation.navigate('CreateEdit')
        }} >
        <Icon name='add' size={30} color='white' />
      </TouchableOpacity>
    </>)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    maxHeight: 120,
  },

  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    flexDirection: 'row',
    height: '20%',
    width: '80%',
    padding: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  createButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: '#8B18D3',
    borderRadius: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
})
