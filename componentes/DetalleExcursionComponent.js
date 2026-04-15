import { Component } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

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
          <View style={styles.iconoContainer}>
            <IconButton
              icon={props.favorita ? 'heart' : 'heart-outline'}
              size={28}
              onPress={() =>
                props.favorita
                  ? console.log('La excursión ya se encuentra entre las favoritas')
                  : props.onPress()
              }
            />
          </View>
        </Card.Content>
      </Card>
    );
  }

  return <View />;
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />
      <Card.Content>
        {comentarios.map((item) => {
          const fecha = new Date(item.fecha).toLocaleString();

          return (
            <View key={item.id} style={styles.comentarioContainer}>
              <Text style={styles.comentarioTexto}>{item.texto}</Text>
              <Text style={styles.comentarioValoracion}>
                {item.valoracion} estrellas
              </Text>
              <Text style={styles.comentarioAutor}>
                {item.autor} - {fecha}
              </Text>
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({
      favoritos: this.state.favoritos.concat(excursionId),
    });
  }

  render() {
  const { excursionId } = this.props.route.params;

  return (
    <ScrollView>
      <RenderExcursion
        excursion={this.state.excursiones[+excursionId]}
        favorita={this.state.favoritos.some((el) => el === +excursionId)}
        onPress={() => this.marcarFavorito(+excursionId)}
      />
      <RenderComentario
        comentarios={this.state.comentarios.filter(
          (comentario) => comentario.excursionId === +excursionId
        )}
      />
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
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  comentarioContainer: {
    marginBottom: 12,
  },
  comentarioTexto: {
    fontSize: 14,
    marginBottom: 4,
  },
  comentarioValoracion: {
    fontSize: 14,
    marginBottom: 2,
  },
  comentarioAutor: {
    fontSize: 12,
    color: 'gray',
  },
});

export default DetalleExcursion;