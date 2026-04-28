import { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, List, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = (state) => {
  return {
    actividades: state.actividades,
  };
};

function Historia() {
  return (
    <Card style={styles.card}>
      <Card.Title title="Un poquito de historia" titleStyle={styles.cardTitle} />
      <Card.Content>
        <Text style={styles.paragraph}>
          El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
        </Text>
        <Text style={styles.paragraph}>
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
        </Text>
        <Text>Gracias!</Text>
      </Card.Content>
    </Card>
  );
}

class QuienesSomos extends Component {
  renderActividad = ({ item }) => {
    return (
      <View>
        <List.Item
          title={item.nombre}
          description={item.descripcion}
          titleNumberOfLines={0}
          descriptionNumberOfLines={0}
          left={(props) => (
            <Image
              source={{ uri: baseUrl + item.imagen }}
              style={[props.style, styles.image]}
              resizeMode="contain"
            />
          )}
          titleStyle={styles.itemTitle}
          descriptionStyle={styles.itemDescription}
          contentStyle={styles.itemContent}
        />
        <Divider />
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <Historia />
        <Card style={styles.card}>
          <Card.Title title="Actividades y recursos" titleStyle={styles.cardTitle} />
          <Card.Content>
            <FlatList
              data={this.props.actividades.actividades}
              renderItem={this.renderActividad}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  cardTitle: {
    textAlign: 'center',
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 22,
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  itemContent: {
    paddingRight: 8,
  },
});

export { Historia };
export default connect(mapStateToProps)(QuienesSomos);
