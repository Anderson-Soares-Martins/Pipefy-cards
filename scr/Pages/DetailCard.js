import * as React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon, Card, Text } from 'react-native-elements'

export default function DatailCard({ route }) {

  const card = {
    title: route.params?.card?.title ?? "",
    description: route.params.card?.subtitles?.filter(subtitle => subtitle.name === "Product description")?.[0]?.value ?? "-",
    name: route.params?.card?.subtitles?.filter(subtitle => subtitle.name === "Suggester name")?.[0]?.value ?? "-",
    email: route.params?.card?.subtitles?.filter(subtitle => subtitle.name === "Suggester email")?.[0]?.value ?? "-",
    priority: route.params?.card?.labels[0]?.name ?? "-",
    priorityColor: route.params?.card?.labels[0]?.color ?? "",
  }

  return (
    <View>
      <ScrollView>
        <Card>
          <View style={styles.header}>
            <Icon
              name='time'
              type="ionicon"
              color={card.priorityColor}
              iconStyle={{ marginRight: 2 }}
            />
            <Card.Title>
              <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{card.title}</Text>
            </Card.Title>
            <Icon
              name="ellipsis-vertical-outline"
              type="ionicon"
              color="#121212"
            />
          </View>
          <Card.Divider />
          <View style={styles.content}>
            <Text style={styles.textSubtitles}>Description:</Text>
            <Text style={styles.textSubtitle}>{card.description}</Text>

            <Text style={styles.textSubtitles}>Suggester name:</Text>
            <Text style={styles.textSubtitle}>{card.name}</Text>

            <Text style={styles.textSubtitles}>Suggester email:</Text>
            <Text style={styles.textSubtitle}>{card.email}</Text>

            <Text style={styles.textSubtitles}>Priority:</Text>
            <Text style={styles.textSubtitle}>{card.priority}</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textSubtitles: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textSubtitle: {
    fontSize: 15,
    marginBottom: 20,
  },

})