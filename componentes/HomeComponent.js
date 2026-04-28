import { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: baseUrl + item.imagen }}
        style={styles.image}
        imageStyle={styles.imageBorder}
      >
        <Text style={styles.titulo}>{item.nombre}</Text>
      </ImageBackground>
      <Card.Content>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.props.actividades.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    justifyContent: 'flex-start',
    minHeight: 180,
    padding: 16,
  },
  imageBorder: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    color: 'chocolate',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(Home);
