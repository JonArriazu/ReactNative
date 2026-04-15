import { Component } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40Años.png')}
          style={styles.image}
          imageStyle={styles.imageBorder}
        >
          <Text style={styles.titulo}>{excursion.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
        </Card.Content>
      </Card>
    );
  }

  return <View />;
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  render() {
    const { excursionId } = this.props.route.params;

    return <RenderExcursion excursion={this.state.excursiones[+excursionId]} />;
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

export default DetalleExcursion;
