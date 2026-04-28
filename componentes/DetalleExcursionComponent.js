import { Component } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import { baseUrl } from '../comun/comun';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
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
          const fechaCorregida = item.dia.replace(/\s*:\s*/g, ':');
          const fecha = new Date(fechaCorregida).toLocaleString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          return (
            <View key={item.id} style={styles.comentarioContainer}>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
              <Text style={styles.comentarioValoracion}>
                {item.valoracion} estrellas
              </Text>
              <Text style={styles.comentarioAutor}>
                -- {item.autor}, {fecha}
              </Text>
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  comentarioContainer: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  comentarioTexto: {
    fontSize: 16,
    marginBottom: 10,
  },
  comentarioValoracion: {
    fontSize: 15,
    marginBottom: 6,
  },
  comentarioAutor: {
    fontSize: 14,
    color: 'gray',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);